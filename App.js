const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/app.html')
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.broadcast.emit('hi');


});


server.listen(port, () => {
    console.log('listening on ' + port);
});