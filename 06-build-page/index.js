const path = require('path');
const fs = require('fs');
const pathToFolder = path.join(__dirname, 'project-dist');
const pathToSourceFolder = path.join(__dirname, 'styles');

fs.mkdir(pathToFolder, {withFileTypes: true}, () => {
    const pathToFile = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));
    fs.readdir(pathToSourceFolder, {withFileTypes: true}, (err, files) => {
      if (err) throw err;
      for (let file of files) {
        if (path.extname(file.name) === '.css') {
          const pathToSourceFile = fs.createReadStream(path.join(__dirname, 'styles', file.name), 'utf-8');
          pathToSourceFile.on('data', chunk => pathToFile.write(chunk));
        }
      }
    })
})