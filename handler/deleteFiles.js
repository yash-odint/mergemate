const path = require("path");
const fs = require("fs");

function deleteFiles(directory){
    fs.readdir(directory, (err, files) => {
        if(err) throw err;
        for (const file of files) {
            fs.unlink(path.join(directory, file), (err) => {
                if (err) throw err;
            });
        };
    });
}

module.exports = {deleteFiles};