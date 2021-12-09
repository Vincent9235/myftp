export function quit(socket) {
    socket.write("221 Closing connection \r\n");
    socket.end();
    socket.destroy();
}