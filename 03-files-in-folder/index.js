const path = require('path');
const fs = require('fs');
const pathToFolder = path.join(__dirname, './secret-folder');

fs.readdir(pathToFolder, {withFileTypes: true}, (err, files) => {
    if (err) throw err;
    for (let file of files) {
        let pathToFile = path.join(__dirname, './secret-folder', file.name);
        fs.stat(pathToFile, (err, stats) => {
            if (err) throw err;
            if (!stats.isDirectory()) {
                console.log(path.parse(file).name + ' - ' + path.extname(file).slice(1) + ' - ' + stats.size + ' bytes');
            }
        })
    }
})