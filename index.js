#!/usr/bin/env node

const fs = require('fs');
const { exec } = require('child_process');

let startingDir = process.cwd();

let repoCheck = (sub = '') => {
  let msgs = ['Changes not staged for commit:', 'Untracked files:', 'Changes to be committed:'];
  exec("git status", {cwd: `${startingDir}/${sub}`}, (error, stdout) => {
    let stdoutArr = stdout.split('\n');
    if (msgs.some(msg => stdout.includes(msg))) {
      stdoutArr.forEach((line, idx, src) => {
        if (msgs.includes(line)) {
          src[idx] = `\x1b[1m${line}\x1b[0m`;
        }
      });
      stdoutArr = stdoutArr.join('\n');

      if (sub) {
        console.log(`\x1b[32m${sub}\x1b[0m\n${stdoutArr}`);
      } else {
        console.log(`\x1b[32m${startingDir.split('/').pop()}\x1b[0m\n${stdoutArr}`);
      }
    }

    if (!sub && stdout.includes('up to date')) {
      console.log(`${startingDir} is up to date.`);
    }
  });
}

let getStatus = () => {
  let contents = fs.readdirSync(`${startingDir}`);

  if (contents.includes('.git')) {
    repoCheck();
    return;
  }

  console.log(`Not a repo...\nScanning ${startingDir} for subdirectories...`);
  let results = fs.readdirSync(startingDir, { withFileTypes: true }).filter(result => result.isDirectory());

  if (!results.length) {
    console.log('No subdirectories. Try another folder.');
  } else {
    results.forEach(result => {
      console.log(`• ${result.name}`)
    });

    console.log(`\nChecking for unstaged, untracked or uncommitted...`);
    results.forEach(result => {
      repoCheck(result.name); // TODO: docs/ – if repoCheck has nothing to say, 'no repos'
    });
  }
}

getStatus();
