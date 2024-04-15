const path = require("path");
const {mergePDFs} = require("./handler/merger");
const fs = require('fs');

const uploadsPath = path.join(__dirname, "/uploads");
fs.readdir(uploadsPath, (err, files) => {
    console.log(files);
    const date = mergePDFs(files, uploadsPath);
});