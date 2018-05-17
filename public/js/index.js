const socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
});


socket.on('newMessage', function(message) {

    const formattedTime = moment(message.createdAt).format('h:mm a');

    const template = jQuery('#message-template').html();
    const html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
});

socket.on('userJoined', function(msg) {
    console.log('User Joined', msg);
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newLocationMessage', function (message) {

    const formattedTime = moment(message.createdAt).format('h:mm a');

    const template = jQuery('#location-message-template').html();

    const html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);

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
