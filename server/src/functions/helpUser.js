import fs from 'fs';

/**
 * Send the man commands to the client
 * @param {*} socket 
 */
export function helpUser(socket) {
    let rawdata = fs.readFileSync(`${__dirname}/../data/help.json`);
    let helpData = JSON.parse(rawdata).helpUser;
    let stringToSend = "\r\n You can use these commands: \r\n";
    for (const [key, value] of Object.entries(helpData)) {
        stringToSend += `-> ${key} : ${value} \r\n`;
    }
    socket.write(stringToSend);
}