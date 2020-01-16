
const students = require('./.students.js/index.js');
const rmdir = require('rimraf');
const git = require('./directory.js');
const gitRepos = git.gitRepos;

// get student directory:
function getFilePath(dir) {
  return gitRepos + dir + '\\*';
}

// remove all repos
(function deleteDirectories() {
    students.forEach(s => {
      let userDirectory = getFilePath(s.dir);
      console.log(`Deleting ${s.dir}`)
      rmdir(userDirectory, (e) => {
        console.log(e)
        console.log(`\x1b[35m\Everything deleted...\x1b[0m`)
      });
    })
})();

// eof