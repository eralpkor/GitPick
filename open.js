var nodegit = require('nodegit');

nodegit.Repository.open('../gerard/open').then(function(repo) {
  console.log("Using " + repo.path());
}).catch(function (err) {
  console.log(err);
});