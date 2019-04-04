function isTsFile(fileName) {
    const parts = fileName.split(".");
    const extension = parts[parts.length - 1];

    return extension === "ts";
}

module.exports = {
    isTsFile
};

