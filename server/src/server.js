import { createServer } from "net";
import { helpUser } from './helpUser';
import { userCheck } from './userCheck';
import { quit } from './quit';
import { readDirectory } from './Directory';
import { checkPasswdord } from './checkPassword';

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
        case "SYST":
          socket.write("215 \r\n");
          break;
        case "FEAT":
          socket.write("211 \r\n");
          break;
        case "PWD":
          socket.write("257 /users/dylan\r\n");
          break;
        case "TYPE":
          socket.write("200 \r\n");
          break;
        case "LIST":
          socket.write("\nCurrent directory filenames: \n", readDirectory());
          break;
        case "HELP":
          helpUser(socket);
          break;
        case "QUIT":
          quit(socket);
          break;

        default:
          console.log("502 Command not supported:", command, args);
      }
    });

    socket.write("220 Hello World \r\n");
  });

  server.listen(port, () => {
    console.log(`Server started at localhost:${port}`);
  });
}


/**
 *Check if user name exists
 * @param {string} name
 * @return string
 **/
/* function checkuser(name) {
  let answer = "User does not exist"
  const fs = require('fs');
  let rawdata = fs.readFileSync('D:/Téléchargements/my-ftp-server/server/user.json');
  let user = JSON.parse(rawdata);
  if (user[name] != null) {
    answer = "User exists"
  }
  return answer
} */


/**
 * Check if the password is right
 * @param {string} password
 * @returns string

function checkPassword(password) {
  if (users[currentUser] == password)
    return ("230 authentification succeeded");
  return ("430 Authentification failed");
}
*/