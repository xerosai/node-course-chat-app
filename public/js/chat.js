const socket = io();

const scrollToButtom = function () {
    // selectors
    const messages = jQuery('#messages');
    const newMessage = messages.children('li:last-child');

    // heights
    const clientHeight = messages.prop('clientHeight');
    const scrollTop = messages.prop('scrollTop');
    const scrollHeight = messages.prop('scrollHeight');
    const newMessageHeight = newMessage.innerHeight();
    const lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
};

socket.on('connect', function() {
    console.log('Connected to server');
    const params = jQuery.deparam(window.location.search);
    socket.emit('join', params, function(err) {
        if (err) {
            alert(err);
            window.location.href='/';
        } else {
            console.log('no error');
        }
    });
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
    scrollToButtom();
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
    scrollToButtom();
});

socket.on('updateUserList', function (users) {
    console.log('Users list', users);
    const ol = jQuery('<ol></ol>');

    users.forEach(function(user) {
        ol.append(jQuery('<li></li>').text(user));
    });

    jQuery('#users').html(ol);
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
