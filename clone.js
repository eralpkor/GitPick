// Simple GitHub multi clone tool

var Git = require('nodegit');
var path = require('path')
var fs =require('fs')
var students = require('./students.js'); // students array

// Change it for daily repositories challenge or sprints
var gitRepoForToday = '/Sprint-Challenge-Applied-Javascript.git';

function makeDir(dir_path) {
  if (!fs.existsSync(dir_path)) {
    fs.mkdirSync(dir_path);
  }
  return dir_path;
}

function getRepoUserName(name) {
  return `https://github.com/${name}${gitRepoForToday}`;
}

// this goes up one level and gets student directory
function getFilePath(dir) {
  return '../' + dir;
}

// this is where the magic happens
function cloneRepos() {
  return new Promise(function(resolve, reject) {
    console.log('Starting to clone repos...');
    var promises = [];
    students.forEach(function(s) {
      var url = getRepoUserName(s.user);
      var userDirectory = getFilePath(s.dir);
      var gitDirectory = makeDir(userDirectory + gitRepoForToday);
      var p = Git.Clone(url, gitDirectory).then(repo => {
        console.log("Cloned " + path.basename(url) + ' to ' + repo.workdir())
      })
      .catch(err => console.log(err))
      promises.push(p);
    })
    console.log(promises)
    Promise.all(promises).then(function() {
      console.log('\done');
      resolve('success');
    }).catch(function (e) {
      reject(e);
    })
  })
}

cloneRepos();


