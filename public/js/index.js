const socket = io();

socket.on('connect', function() {
    console.log('Connected to server');

    // socket.emit('createMessage', {
    //     from: 'bob',
    //     text: 'blah blah blah'
    // });
});


socket.on('newMessage', function(msg) {
    console.log('New message received', msg);
    const li = jQuery('<li></li>');
    li.text(`${msg.from}: ${msg.text}`);

    jQuery('#messages').append(li);
});

socket.on('userJoined', function(msg) {
    console.log('User Joined', msg);
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newLocationMessage', function (message) {
    const li = jQuery('<li></li>');
    const a = jQuery('<a target="_blank">My current location</a>');

    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);

    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();

    const messageField = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageField.val()
    }, function () {
        messageField.val('');
    });
});

const locationButton = jQuery('#send-location');

locationButton.on('click', function(e) {
    if (!navigator.geolocation) {
        return alert('Location services not supported by your browser');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position);
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        locationButton.removeAttr('disabled').text('Send location');
    }, function (error) {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to get location');
    })
})
