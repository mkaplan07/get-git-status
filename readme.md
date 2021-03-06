# get-git-status

get-git-status is a script that runs ```git status``` for the current directory and subdirectories

![get-git-status](g-g-s.gif)

## Installation

Via npm:

```bash
npm install -g get-git-status
```

## Usage

Choose a directory and enter ```get-git-status```. If the current directory is a repo, the script will run ```git status``` on it. If the directory is not a repo, the script will scan its subdirectories and run ```git status``` on any repos it finds.

The printout looks best on light backgrounds, but it works on any profile or theme.
