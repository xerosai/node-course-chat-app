const socket = io();

socket.on('connect', function() {
    console.log('Connected to server');

    socket.emit('createMessage', {
        from: 'bob',
        text: 'blah blah blah'
    });
});


socket.on('newMessage', function(msg) {
    console.log('New message received', msg);
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});
