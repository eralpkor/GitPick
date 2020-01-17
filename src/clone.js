// Simple GitHub multi clone tool

const Git = require('nodegit');
const path = require('path')
const fs =require('fs')
const git = require('../.directory.js');
const gitRepos = git.gitRepos;
const students = git.students;

// Change it for daily repositories challenge or sprints
let gitRepoForToday = '/dark-mode';

function makeDir(dir_path) {
  if (!fs.existsSync(dir_path)) {
    fs.mkdirSync(dir_path);
  }
  return dir_path;
}

function getRepoUserName(name) {
  return `https://github.com/${name}${gitRepoForToday}`;
}

// up one level and gets student directory
function getFilePath(dir) {
  return gitRepos + dir;
}

// this is where the magic happens
(function cloneRepo() {
  return new Promise(function(resolve, reject) {
    console.log('Starting to clone repositories...');
    var promises = [];
    students.forEach(function(s) {
      var url = getRepoUserName(s.user);
      var userDirectory = getFilePath(s.dir);
      var gitDirectory = makeDir(userDirectory + gitRepoForToday);
      var p = Git.Clone(url, gitDirectory).then(repo => {
        console.log(`\x1b[35mCloned: ${path.basename(url)} to \x1b[42m${repo.workdir()}\x1b[0m`)
      })
      .catch(err => console.log(err))
      promises.push(p);
    })
    console.log(promises)
    Promise.all(promises).then(function() {
      console.log('\All done...');
      resolve(console.log('\All done...'));
    }).catch(function (e) {
      reject(e);
    })
  })
})()


// EOF


