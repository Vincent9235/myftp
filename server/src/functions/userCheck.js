import fs from 'fs';

/**
 *Check if user name exists 
 * @param {string} name 
 * @param allSockets
 * @param socket
 * @return string
 **/
export function userCheck(name, allSockets, socket) {
    let message = "User does not exist";
    let rawdata = fs.readFileSync(`${__dirname}/../data/user.json`);
    let user = JSON.parse(rawdata);
    if (user[name] != null) {
        allSockets[socket.uid] = name;
        message = "331 User " + name + " is valid, please precise PASS \n\r"
    }
    return message;
}