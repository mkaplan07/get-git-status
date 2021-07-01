#!/usr/bin/env node

const fs = require('fs');
const { exec } = require('child_process');

let startingDir = process.cwd();

let repoCheck = (sub = '') => {
  let msgs = ['Changes not staged for commit:', 'Untracked files:', 'Changes to be committed:', 'Your branch is ahead'];
  exec("git status", {cwd: `${startingDir}/${sub}`}, (error, stdout) => {
    if (msgs.some(msg => stdout.includes(msg))) {
      let stdoutArr = stdout.split('\n');
      stdoutArr.forEach((line, idx, src) => {
        if (msgs.includes(line)) { // 'Your branch is ahead' will not be underlined
          src[idx] = `\x1b[4m${line}\x1b[0m`;
        }
      });
      stdoutArr = stdoutArr.join('\n');

      console.log(sub ? `• \x1b[1m${sub}\x1b[0m\n${stdoutArr}` : `${stdoutArr}`);
      return;
    }

    if (error) {
      console.log(`• ${sub} is not a repo`);
    } else if (sub && stdout.includes('up to date')) {
      console.log(`• ${sub} is \x1b[32mup to date\x1b[0m`);
    } else {
      console.log(`\x1b[32mup to date\x1b[0m`);
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

  setTimeout(() => {
    let results = fs.readdirSync(startingDir, { withFileTypes: true }).filter(result => result.isDirectory());

    if (!results.length) {
      console.log('No subdirectories');
      return;
    }

    results.forEach(result => {
      repoCheck(result.name);
    });
  }, 500);
}

getStatus();
