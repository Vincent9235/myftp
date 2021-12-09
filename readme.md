# MYFTP
Project realized by Vincent Laurens in B3CDGP at EFREI PARIS 
MyFtp is a node compatible, FTP client and server, coded in JavaScript.

## Installation

MYFTP requires Node.js v14+ to run.

Install the dependencies with npm install.
```
npm install
```
You have several choices to run, build, and start a transcrypted version of either the server or the client :
```
npm run dev  
npm run build 
npm run start 
```

## Commands
The client manages the following orders:

    USER <username>: check if the user exist
    PASS <password>: authenticate the user with a password
    LIST: list the current directory of the server
    CWD <directory>: change the current directory of the server
    RETR <filename>: transfer a copy of the file FILE from the server to the client
    STOR <filename>: transfer a copy of the file FILE from the client to the server
    PWD: display the name of the current directory of the server
    HELP: send helpful information to the client
    QUIT: close the connection and stop the program
