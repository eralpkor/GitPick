
const students = require('./students.js');
const rmdir = require('rimraf');

let gitRepos = 'C:\\Users\\Eralp\\Desktop\\fullstack-dev\\Lambda_School\\students\\student_repos\\'

// get student directory:
function getFilePath(dir) {
  return gitRepos + dir + '\\*';
}

// remove all repos
(function deleteDirectories() {
    students.forEach(s => {
      let userDirectory = getFilePath(s.dir);
      rmdir(userDirectory, (e) => {
        console.log(e)
        console.log('\x1b[35m\Everything deleted...\x1b[0m')
      });
    })
})();

// eof