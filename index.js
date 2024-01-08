const express = require('express');
 const app = express();
 const path = require('path')
 const http = require('http');

 const { Server } = require("socket.io");  // get sever from socket.io

 const server = http.createServer(app) // create my own server (seperated from http server)
 const io = new Server(server); // connect to server
 
 app.get('/', (req, res) => {
     res.sendFile(path.join(__dirname,'index.html') );
    });
    
    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('chat message', (msg) => {
            console.log('message: ' + msg);
            io.emit('send message to all users', msg); //create event called(send message to all users)
          });
    });
    
    server.listen(3000, () => {
        console.log("http://localhost:3000/");
    });