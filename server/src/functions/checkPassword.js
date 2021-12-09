import fs from 'fs';

/**
 * Check User password
 * @param {*} password 
 * @param {*} allSockets 
 * @param {*} socket 
 * @returns 
 */
export function checkPasswdord(password, allSockets, socket) {
    let passw = "430 Authentication failed\r\n";
    let rawdata = fs.readFileSync(`${__dirname}/../data/user.json`);
    let bank = JSON.parse(rawdata);
    if (bank[allSockets[socket.uid]]["password"] == password) {
        passw = "230 Password corresponds, successful authentication\r\n"
    }
    return passw;
}