#!/usr/bin/env node

const fs = require('fs');
const { exec } = require('child_process');

let startingDir = process.cwd();

let repoCheck = (sub = '') => {
  let msgs = ['Changes not staged for commit:', 'Untracked files:', 'Changes to be committed:'];
  exec("git status", {cwd: `${startingDir}/${sub}`}, (error, stdout) => {
    if (msgs.some((msg) => stdout.includes(msg))) {
      if (sub) {
        let re = new RegExp('branch', 'g');
        let printout = stdout.replace(re, function(match) {
          return `\x1b[1m${match}\x1b[0m`;
        })
        console.log(`\x1b[32m${sub}\x1b[0m\n${printout}`);
      } else {
        console.log(`\x1b[32m${startingDir.split('/').pop()}\x1b[0m\n${stdout}`);
      }
    }
  });
}

let getStatus = () => {
  let contents = fs.readdirSync(`${startingDir}`);

  if (contents.includes('.git')) {
    repoCheck();
  } else {
    console.log(`\nNot a repo.\nScanning ${startingDir} for subdirectories...`);
    let results = fs.readdirSync(startingDir, { withFileTypes: true });
    let subs = false;
    results.forEach(result => {
      if (result.isDirectory()) {
        subs = true;
        console.log(`• ${result.name}`);
      }
    });

    setTimeout(() => {
      if (subs) {
        console.log(`\nChecking for repos...`);
        setTimeout(() => {
          results.forEach(result => {
            if (result.isDirectory()) {
              repoCheck(result.name);
            }
          });
        }, 750);
      } else {
        console.log('\nNo subdirectories. Goodbye.');
      }
    }, 500);
  }
}

getStatus();
