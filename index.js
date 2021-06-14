const fs = require('fs');
const { exec } = require('child_process');

let startingDir = process.cwd();

let repoCheck = function(sub = '') {
  exec("git status", {cwd: `${startingDir}/${sub}`}, (error, stdout) => {
    console.log(sub.toUpperCase());
    if (error) {
      console.log(error.message);
    } else if (stdout.includes('Changes not staged for commit:') || stdout.includes('Untracked files:')) {
      console.log(`\x1b[32m${stdout}\x1b[0m`);
    } else {
      console.log(`${stdout}`);
    }
  });
}

let getStatus = function() {
  let contents = fs.readdirSync(`${startingDir}`);

  if (contents.includes('.git')) {
    repoCheck();
  } else {
    console.log(`\nNot a repo. Scanning ${startingDir} for directories...`);
    let results = fs.readdirSync(startingDir, { withFileTypes: true });
    results.forEach(result => {
      if (result.isDirectory()) {
        console.log(`• ${result.name}`);
      }
    });

    setTimeout(() => {
      console.log(`\nChecking for repos...`);
    }, 500);

    setTimeout(() => {
      results.forEach(result => {
        if (result.isDirectory()) {
          repoCheck(result.name);
        }
      });
    }, 750);
  }
}

getStatus();
// module.exports = getStatus;
