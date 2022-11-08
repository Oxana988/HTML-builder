const fs = require('fs');
const path = require('path');
const pathToFolder = path.join(__dirname, 'files-copy');
const pathToSourceFolder = path.join(__dirname, 'files');

fs.mkdir(pathToFolder, () => {
  fs.readdir(pathToFolder, (err, files) => {
    if (err) throw err;
    for (let file of files) {
        fs.unlink(path.join(__dirname, 'files-copy', file), (err) => { 
        if (err) throw err;
    })
    }
  });
  fs.readdir(pathToSourceFolder, (err, files) => {
    if (err) throw err;
    for (let file of files) {
        fs.copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', file), () => { });
    }
  })
});
