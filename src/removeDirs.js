
const rmdir = require('rimraf');
const directory = require('../.directory');
const gitRepos = directory.gitRepos;
const students = directory .students;

// get student directory:
function getFilePath(dir) {
  return gitRepos + dir + '\\*';
}

// remove all repos
(function deleteDirectories() {
    students.forEach(s => {
      let userDirectory = getFilePath(s.dir);
      console.log(`\x1b[31mEverything will be deleted in\x1b[31m \x1b[33m${s.dir} \x1b[31m directory.\x1b[31m`)
      rmdir(userDirectory, (e) => {
        let names = s.dir.charAt(0).toUpperCase() + s.dir.slice(1);
        console.log(e)
        console.log(`\x1b[32m\From user name ${names} everything deleted...\x1b[0m`)
      });
    })
})();

// eof