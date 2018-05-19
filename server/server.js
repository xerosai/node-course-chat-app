const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validationUtils');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');

const app = express();

const server = http.createServer(app);

const io = socketIO(server);

const users = new Users();

app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.get('/chat', (req, res) => {
    res.sendFile('chat.html');
});

io.on('connection', (socket) => {
    console.log('New user connected');

    // socket.emit('newMessage', {
    //     from: 'example',
    //     text: 'This is a message',
    //     createdAt: Date.now()
    // });

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name area required');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined the conversation`));

        callback();
    });

    socket.on('createMessage', (message, callback) => {
        console.log('create message', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
        const user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        }
    });
});


const PORT = process.env.PORT || 3455;
server.listen(PORT, () => {
    console.log(`Started server on PORT: ${PORT}`);
});
