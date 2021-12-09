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

  //Connection
  if (status == 220) {
    currentCommand = "USER";
    console.log("Please enter your user name (USER) ");
    //client.write("USER Vincent");
    const rl = createInterface({
      input: process.stdin,
    });
    rl.on("line", (input) => {
      client.write(input)
    });
  };

  //Disconnect
  if (status == 221) {
    console.log("You will be disconnected.");
    process.exit();
  }

  process.stdout.write("> ");
  if (status == 230 && currentCommand === "USER") {
    isAuthenticated = true;
  }
});
