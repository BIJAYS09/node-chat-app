
var socket = io();

socket.on('connect',function () {
    console.log('Connected to server');
});

socket.on('disconnect',function () {
    console.log('Disconnect from server');
});

//custom events

// socket.on('newEmail',function(email){
//     console.log('New Email',email);
// });

socket.on('newMessage',function(message){
    console.log('new message',message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}:${message.text}`);
    jQuery('#messages').append(li);
});

// socket.emit('createMessage',{
//     from:"User",
//     text:"Hello Boss"
// }, function (data) {
//     console.log('Call back from server', data);
// });

socket.on('newLocationMessage',function(message) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current Location</a>');
    li.text(`${message.from}: `);
    a.attr('href',message.url);
    li.append(a);

    jQuery('#messages').append(li); 
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function () {

    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click',function (){
    if(!navigator.geolocation){
        return alert('Geolocation not supported in your browser');
    }
    navigator.geolocation.getCurrentPosition(function (position) {
    // console.log(position);
    socket.emit('createLocationMessage',{
        longitude: position.coords.longitude,
        latitude: position.coords.latitude
    });

    }, function () {
        alert('Unable to fetch location');
    });
});