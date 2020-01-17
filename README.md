# GitPick

### Clone multiple repositories from gitHub

Create a `.directory.js` file
Add your own user list 
example:
```javascript
const students = [{dir: 'dirName', 'user: 'github_User_Name'}];
```

Add repository directory:

Mac - Linux
```javascript
const gitRepos = '/Home/user/gitRepos';
```
Windows
```javascript
const gitRepos = 'C:\\Users\\user_name\\directory_name\\';
```
```javascript
module.exports = {
  gitRepos,
  students,
};
```
