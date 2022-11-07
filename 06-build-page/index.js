const path = require('path');
const fs = require('fs');
const pathToFolder = path.join(__dirname, 'project-dist');
const pathToSourceFolder = path.join(__dirname, 'styles');
const pathToFile = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));
fs.mkdir(pathToFolder, () => {
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