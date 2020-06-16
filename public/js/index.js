
var socket = io();

socket.on('connect',function () {
    console.log('Connected to server');

    // socket.emit('createEmail',{
    //     to:"jeny@gmail.com",
    //     text:"Hello from Client Side"
    // });

    socket.emit('createMessage',{
        to:'ClientToServer@gmail.com',
        text:'Hello from Client'
    });
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
});

