const path = require('path');
const fs = require('fs');
const pathToFolder = path.join(__dirname, 'secret-folder');

fs.readdir(pathToFolder, {withFileTypes: true}, (err, files) => {
    if (err) throw err;
    for (let file of files) {
        if (file.isFile()) {
            fs.stat((path.join(__dirname, 'secret-folder', file.name)), (err, stats) => {
                if (err) throw err;
                //console.log(path.parse(file.name).name);
                //console.log(path.extname(file.name).substring(1));
                //console.log(stats.size);
                console.log(path.parse(file.name).name + ' - ' + path.extname(file.name).substring(1) + ' - ' + stats.size + 'b');
            })
        } 
    }
})
