const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname)));

io.on('connection', socket => {
    console.log('A WS connection detected');

    socket.emit('receive', 'RemoChat bot: Welcome to RemoChat');

    //name
    socket.on('joinRoom', (name) => {
        //broadcast
    socket.broadcast.emit('receive', `RemoChat bot: A user user joined the chat`);

    //disconnect
    socket.on('disconnect', () => {
        socket.broadcast.emit('receive', 'RemoChat bot: A user has left the chat');
    })

    //chat message
    socket.on('chatMessage', (msg) => {
        console.log(msg);
        socket.broadcast.emit('receive', `${name}: ${msg}`);
        socket.emit('sending', `${name}: ${msg}`);

        if (msg.includes("!help") == true) {
                io.emit('receive', `RemoChat Bot: This is a simple website for chatting there is nothing complicated however if you are facing any issues you can still contact us on our contact form which will be available soon!`)
        }

        if (msg.includes("!support") == true) {
                io.emit('receive', `RemoChat Bot: Subscribe me on YouTube <a href="https://youtube.com/c/1ndo." target="blank" style="color: #730073;">LINK</a>`)
        }
    })
    })

    
})

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on ${PORT}`));
