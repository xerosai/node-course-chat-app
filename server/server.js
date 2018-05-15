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

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});


const PORT = process.env.PORT || 3455;
server.listen(PORT, () => {
    console.log(`Started server on PORT: ${PORT}`);
});
