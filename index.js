#!/usr/bin/env node

const fs = require('fs');
const { exec } = require('child_process');

let startingDir = process.cwd();

let repoCheck = (sub = '') => {
  let msgs = ['Changes not staged for commit:', 'Untracked files:', 'Changes to be committed:'];
  exec("git status", {cwd: `${startingDir}/${sub}`}, (error, stdout) => {
    if (msgs.some(msg => stdout.includes(msg))) {
      let stdoutArr = stdout.split('\n');
      stdoutArr.forEach((line, idx, src) => {
        if (msgs.includes(line)) {
          src[idx] = `\x1b[1m${line}\x1b[0m`;
        }
      });
      stdoutArr = stdoutArr.join('\n');

      console.log(sub ? `• ${sub}\n${stdoutArr}` : `• ${startingDir.split('/').pop()}\n${stdoutArr}`);
      return;
    }

    if (error) {
      console.log(`• ${sub} is not a repo`);
    } else if (sub && stdout.includes('up to date')) {
      console.log(`• ${sub} is \x1b[32mup to date\x1b[0m`);
    } else {
      console.log(`• ${startingDir} is \x1b[32mup to date\x1b[0m`);
    }
  });
}

let getStatus = () => {
  let contents = fs.readdirSync(`${startingDir}`);

  if (contents.includes('.git')) {
    repoCheck();
    return;
  }

  console.log(`Not a repo\nScanning ${startingDir} for subdirectories...`);
  let results = fs.readdirSync(startingDir, { withFileTypes: true }).filter(result => result.isDirectory());

  if (!results.length) {
    console.log('No subdirectories. Try another folder.');
    return;
  }

  results.forEach(result => {
    repoCheck(result.name);
  });
}

getStatus();
