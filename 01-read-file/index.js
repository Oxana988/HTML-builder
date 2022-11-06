const path = require('path');
const fs = require('fs');

const pathToFile = path.join(__dirname, 'text.txt');
const readableStream = fs.createReadStream(pathToFile, 'utf-8');
readableStream.on('data', chunk => console.log(chunk));
readableStream.on('error', error => console.log('Error', error.message));