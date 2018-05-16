const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');

const app = express();

const server = http.createServer(app);

const io = socketIO(server);

app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.sendFile('index.html');
})

io.on('connection', (socket) => {
    console.log('New user connected');

    // socket.emit('newMessage', {
    //     from: 'example',
    //     text: 'This is a message',
    //     createdAt: Date.now()
    // });

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new user has joined'));

    socket.on('createMessage', (message, callback) => {
        console.log('create message', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback({
            message: 'This is from the server'
        });
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});


const PORT = process.env.PORT || 3455;
server.listen(PORT, () => {
    console.log(`Started server on PORT: ${PORT}`);
});
