const path = require('path');
const fs = require('fs');
const pathToFolder = path.join(__dirname, 'project-dist');
const pathToSourceFolder = path.join(__dirname, 'styles');
const pathToFolderAssets = path.join(__dirname, './project-dist/assets');
const pathToSourceFolderAssets = path.join(__dirname, 'assets');
const pathToTemplate = path.join(__dirname, 'template.html');

fs.mkdir(pathToFolder, {withFileTypes: true}, () => {
    //css
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

    //assets
    fs.readdir(pathToSourceFolderAssets, (err, folders) => {
        if (err) throw err;
        for (let folder of folders) {
            fs.mkdir(path.join(pathToFolderAssets, folder), {recursive: true}, () => {
                fs.readdir(path.join(pathToSourceFolderAssets, folder), (err, files) => {
                    if (err) throw err;
                    for (let file of files) {
                        fs.copyFile(path.join(pathToSourceFolderAssets, folder, file), path.join(pathToFolderAssets, folder, file), err => () => { });
                    }
                })
            })
        }
    })

    //html
    const readableStream = fs.createReadStream(pathToTemplate, 'utf-8');
    function buildHtml() {
        const pathToFileHtml = fs.createWriteStream(path.join(pathToFolder,'index.html'));
        readableStream.on('data', chunk => {
            let text = '';
            const addTag = function(chunk) {    
                text = chunk;   
                const startIndex = text.indexOf('{{');
                const endIndex = text.indexOf('}}');
                const tag = text.slice(startIndex + 2, endIndex);        
                const readableStream = fs.createReadStream(path.join(__dirname, 'components', tag + '.html'));
                let component = '';
                readableStream.on('data', (chunk) => {         
                    component = component + chunk.toString();
                    text = text.slice(0, startIndex) + component + text.slice(endIndex + 2);
                    if(text.indexOf('}}') + 1) {
                        addTag(text);
                    } else {
                        pathToFileHtml.write(text);
                    }
                });            
            };
            addTag(chunk);
        });
    }
    buildHtml();
    
})