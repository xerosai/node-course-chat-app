const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

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

    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat app',
        createdAt: Date.now()
    });

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined the server',
        createdAt: Date.now()
    });

    socket.on('createMessage', data => {
        console.log('create message', data);
        io.emit('newMessage', {
            from: data.from,
            text: data.text,
            createdAt: Date.now()
        });
        // socket.broadcast.emit('newMessage', {
        //     from: data.from,
        //     text: data.text,
        //     createdAt: Date.now(),
        // });
    })

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});


const PORT = process.env.PORT || 3455;
server.listen(PORT, () => {
    console.log(`Started server on PORT: ${PORT}`);
});
