import { SSL_OP_EPHEMERAL_RSA } from "constants";
import { createConnection } from "net";
import { createInterface } from "readline";

let currentCommand = '';
let isAuthenticated = false;

const client = createConnection({ port: 4242 }, () => {
  console.log("Client connected.");
});

client.on("data", (data) => {
  const message = data.toString();
  console.log("Message received:", message);

  const [status, ...args] = message.trim().split(" ");
  if (status == 230 && currentCommand === "USER") {
    isAuthenticated = true;
  }

  if (status == 220) {
    currentCommand = "USER";
    client.write("USER Vincent");
    const rl = createInterface({
      input: process.stdin,
    });
    rl.on("line", (input) => {
      client.write(input)
    });
  };

  if(status == 221){
    console.log("You will be disconnected.");
    process.exit();
  }
});
