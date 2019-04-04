//requiring path and fs modules
const path = require('path');
const fs = require('fs');

const { isTsFile } = require("./isTsFile");
//joining path of directory 
const directoryPath = path.join(__dirname, '../bma/src/app/account');
//passsing directoryPath and callback function
//
const deepReadDir = function (pathToDir, cb) {
    return fs.readdir(pathToDir, {withFileTypes: true}, function (err, files) {
        //handling error
        if (err) {
            cb(err);
        }
        //listing all files using forEach
        files.forEach((dirent) => {
            if (dirent.isDirectory()) {
                return deepReadDir(path.join(pathToDir, dirent.name), cb);
            }
            // Do whatever you want to do with the file
            cb(null, dirent);
        });
    });
};

deepReadDir(directoryPath, function (err, file) {
    if (err) {
        console.log(err);
    }

    if (isTsFile(file.name)) {
        console.log(file.name);
    }
});
