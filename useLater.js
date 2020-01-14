const path = require('path');
const fs =require('fs');
const students = require('./students.js');
const rmdir = require('rimraf');

let gitRepos = 'C:\\Users\\Eralp\\Desktop\\fullstack-dev\\Lambda_School\\students\\student_repos\\'

// get student directory:
function getFilePath(dir) {
  return gitRepos + dir + '\\*';
}

(function deleteDirectories() {
  const deleted = [];
  return new Promise(function(resolve, reject) {
    students.forEach(s => {
      let userDirectory = getFilePath(s.dir);
      let p = rmdir(userDirectory, (e) => {
        console.log(e)
      });
      deleted.push(p)
    })
    Promise.all(deleted)
    .then(r => {
      resolve('Success')
    })
    .catch(err => {console.log(err); reject(err)})
  })
})();

// To remove .git files we need to replace read-only permission
async function changePermissions(src) {
  let filesToRemove = await fs.readdirSync(src, {withFileTypes: true});

  for (let file of filesToRemove) {
    let srcPath = path.join(src, file.name);

    if (file.isDirectory()) {
      // if directory chmod recursively
      try {
        await changePermissions(srcPath);
      } catch (err) {
        console.log(`Something wrong ${err}`)
      }
    } else {
      try {
        await fs.chmod(srcPath, 0o777, (err) => {
          if (err) throw err;
          // console.log(`Permission changed ${file.name}`)
        })
      } catch (err) {
        console.log(`Cannot finish chmod ${err}`)
      }
    }
  }
}


function changePermissionsAll() {
  return new Promise(function(resolve, reject) {
    console.log(`Starting permission change`);
    const promises = [];

    students.forEach(s => {
      let userDirectory = getFilePath(s.dir);
      console.log(s.dir)
      let p = changePermissions(userDirectory)
        .then(changes => {
          console.log(changes)
        })
        .catch(err => console.log(err))
        promises.push(p)
    })
    Promise.all(promises)
      .then(r => {
        resolve('Success')
      })
      .catch(err => {console.log(err); reject(err)})
  });
};

changePermissionsAll()
  .then(() => {
    deleteDirectories()
  })
  .catch(e => {
    console.log(`\x1b[31m It didn't work... ${e}`);
  });