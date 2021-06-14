# get-git-status

get-git-status is a script that runs ```git status``` for the current directory and subdirectories

## Installation

Via [npm](https://www.npmjs.com/):

```bash
npm install -g get-git-status
```

## Usage

From the current directory, run ```node get-git-status```. If the current directory is a repo, the module will run ```git status```. If the current directory is not a repo, the module will scan its subdirectories and run ```git status``` on any repos that it finds.

Directories with "Changes not staged for commit" or "Untracked files" will appear in <span style="color:green">*green*</span>.
