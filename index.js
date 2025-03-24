const path = require('path');
const linkify = require('linkifyjs');
const linkifyHtml = require('linkify-html');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname)));

io.on('connection', socket => {
    console.log('A WS connection detected');


    //name
    socket.on('joinRoom', (name) => {
        //broadcast
        socket.broadcast.emit('receive', `RemoChat bot: ${name} joined the chat`);

        //welcome
        socket.emit('receive', `RemoChat bot: Welcome ${name} to RemoChat! Use !help for more info and !support to support us!`);

        //disconnect
        socket.on('disconnect', () => {
            socket.broadcast.emit('receive', `RemoChat bot: ${name} left the chat`);
        })

        //chat message
        socket.on('chatMessage', (msg) => {
            socket.broadcast.emit('receive', linkifyHtml(`<span style="font-weight: 800;">${name}</span>: ${msg}`));
            socket.emit('sending', linkifyHtml(`<span style="font-weight: 800;">${name}</span>: ${msg}`));
            if (msg.includes("!help") == true) {
                io.emit('receive', `RemoChat Bot: This is a simple website for chatting there is nothing complicated however if you are facing any issues you can still contact us on our contact form which will be available soon!`)
            }

            if (msg.includes("!support") == true) {
                io.emit('receive', `RemoChat Bot: Subscribe me on YouTube <a href="https://youtube.com/@1ndo." target="blank" style="color: #730073;">LINK</a>`)
            }
        })
    })


})

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on ${PORT}`));
