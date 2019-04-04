const fs = require('fs');

const IMPORT_UNDERSCORE_RegExp = /import \*.*['"]underscore['"];?(\\n)?/g;

const parser = function (absolutePathToFile) {
    fs.readFile(absolutePathToFile, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }

        const result = data.replace(IMPORT_UNDERSCORE_RegExp, '');

        fs.writeFile(absolutePathToFile, result, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    });
};


module.exports = {
    parser
};
