import { createServer } from "net";
import { helpUser } from './functions/helpUser';
import { userCheck } from './functions/userCheck';
import { quit } from './functions/quit';
import { readDirectory } from './functions/directory';
import { checkPasswdord } from './functions/checkPassword';
import { pwd } from './functions/pwd';
import { cwd } from './functions/cwd';

const allSockets = {};
let idSocket = 0;

export function launch(port) {
  const server = createServer((socket) => {
    let newIdSocket = idSocket;
    idSocket++;
    socket.uid = newIdSocket;
    allSockets[newIdSocket] = '';
    console.log("new connection.");
    socket.on("data", (data) => {
      const message = data.toString();

      const [command, ...args] = message.trim().split(" ");
      console.log(command, args);

      switch (command) {
        case "USER":
          socket.write(userCheck(args, allSockets, socket));
          break;
        case "PASS":
          socket.write(checkPasswdord(args, allSockets, socket));
          break;
        case "SYST":
          socket.write("215 \r\n");
          break;
        case "FEAT":
          socket.write("211 \r\n");
          break;
        case "PWD":
          socket.write(`You are here: ${pwd()}\r\n`);
          break;
        case "CWD":
          socket.write(`You are now here: ${cwd(args)}\r\n`);
          break;
        case "TYPE":
          socket.write("200 \r\n");
          break;
        case "LIST":
          socket.write(`Current directory filenames: ${readDirectory()}\r\n`);
          break;
        case "HELP":
          helpUser(socket);
          break;
        case "QUIT":
          quit(socket);
          break;

        default:
          console.log("502 Command not supported: ", command, args); //Send error to Server
          socket.write("502 Command not supported: " + command + args); //Send error to Client
      }
    });

    socket.write("220 Hello World \r\n");
  });

  //Errors management
  server.on('error', (error) => {
    console.log(error);
  });

  server.listen(port, () => {
    console.log(`Server started at localhost:${port}`);
  });
}