const fs = require('fs');

const IMPORT_UNDERSCORE_RegExp = /import \*.*['"]underscore['"];?/g;
const oldSyntaxRegExp = /_\./g;

const parser = function (absolutePathToFile) {
    fs.readFile(absolutePathToFile, 'utf8', function (err, buffer) {
        if (err) {
            return console.log(err);
        }

        let lines = buffer.split('\n');

        // const result = buffer.replace(IMPORT_UNDERSCORE_RegExp, '');
        // const result = lines.filter(l => !l.match(IMPORT_UNDERSCORE_RegExp)).join('\n');

        const indexOfImport = lines.findIndex(line => !!line.match(IMPORT_UNDERSCORE_RegExp));
        if (indexOfImport === -1) {
            return;
        }

        const requiredImports = lines.reduce((functions, line) => {
            if (!line.match(oldSyntaxRegExp)) {
                return functions;
            }

            let res;
            while ((res = oldSyntaxRegExp.exec(line)) !== null) {
                const endIndex = line.indexOf("(", oldSyntaxRegExp.lastIndex);
                const func = line.slice(oldSyntaxRegExp.lastIndex, endIndex);
                functions.add(func);
            }
            return functions;
        }, new Set());

        lines = lines.map(line => {
            line = line.replace(oldSyntaxRegExp, "_");
            return line;
        });

        let newUnderscoreImports = "";
        requiredImports.forEach(func => newUnderscoreImports = newUnderscoreImports.concat(`import { _${func} } from 'underscore-es/${func}';\n`));

        lines[indexOfImport] = newUnderscoreImports;

        const result = lines.join('\n');
        fs.writeFile(absolutePathToFile, result, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    });
};


module.exports = {
    parser
};
