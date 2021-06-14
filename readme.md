# get-git-status

get-git-status is a script that runs ```git status``` for the current directory and subdirectories

## Installation

Via [npm](https://www.npmjs.com/):

```bash
npm install -g get-git-status
```

## Usage

Choose a directory and enter ```get-git-status```. If the current directory is a repo, the script will run ```git status``` on it. If the directory is not a repo, the script will scan its subdirectories and run ```git status``` on any repos it finds.

Directories with "Changes" or "Untracked files" will appear in green.
