/**
 * Read files in current folder
 * @returns {string} filesList
 */
export function readDirectory() {
    let filesList = "";
    const fs = require('fs');
    let loc = fs.readdirSync(process.cwd());
    loc.forEach((file) => {
        filesList += file + "\r\n";
    });
    return filesList;
}