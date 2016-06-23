# eslint-improved-checkstyle-formatter

An improved Checkstyle formatter for [ESLint](http://eslint.org) mainly for use with the [Jenkins Checkstyle Plugin](https://wiki.jenkins-ci.org/display/JENKINS/Checkstyle+Plugin). 

- Includes URL to ESLint rule in the error message
- Allows optional tweaking of the filepath by using the `CHECKSTYLE_OLD_PROJECT_DIR` and `CHECKSTYLE_NEW_PROJECT_DIR` environment variables.

## Installation

```
$ npm install --save-dev eslint-improved-checkstyle-formatter
```

## Usage

```
$ CHECKSTYLE_OLD_PROJECT_DIR=/home/user/project CHECKSTYLE_NEW_PROJECT_DIR=/tmp/project eslint --format=node_modules/eslint-improved-checkstyle-formatter file.js
```
