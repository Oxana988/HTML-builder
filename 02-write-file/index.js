const path = require('path');
const fs = require('fs');
const {stdin, stdout} = process;
const pathToFile = path.join(__dirname, 'text.txt');

fs.open(pathToFile, 'w', (err) => {
    if (err) throw err;
    stdout.write('Введите текст!\n');
})
stdin.on('data', data => {
    if (data.toString().trim() === 'exit') {
        stdout.write('Ввод текста завершен!')
        process.exit();
    };
    fs.appendFile(pathToFile, data, (err) => {
        if (err) throw err;
        console.log('Продолжите ввод текста!');
    })
})
process.on('SIGINT', () => process.exit());