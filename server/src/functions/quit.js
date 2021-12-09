/**
 * Disconnect client to server
 * @param {*} socket 
 */
export function quit(socket) {
    socket.write("221 Closing connection \r\n");
    socket.end();
    socket.destroy();
}