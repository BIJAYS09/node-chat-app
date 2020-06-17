const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname,'/../public');

const PORT = process.env.PORT || 3000;;
var app = express();
var server = http.createServer(app);
var io  = socketIO(server);
app.use(express.static((publicPath)));

io.on('connection',(socket)=>{
    console.log('New user connected');

    // socket.emit('newEmail',{
    //     from:"manish@example.com",
    //     text:"Hello World from Server side ",
    //     createdAt: 12345
    // });

    // socket.on('createEmail',(newEmail)=>{
    //     console.log('create Email',newEmail);
    // })

    socket.emit('newMessage',generateMessage('Admin','Welcome to chat app'));
    socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));

    socket.on('createMessage',(message, callback)=>{
        console.log('create message',message);
        io.emit('newMessage',generateMessage(message.from,message.text));
        callback();
    });

    socket.on('createLocationMessage', (coords) =>{
        //io.emit('newMessage', generateMessage('Admin',`${coords.latitude},${coords.longitude}`));
        io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
    })


    socket.on('disconnect',()=>{
        console.log('User was disconnected');
    });
});

server.listen(PORT,()=>{
    console.log(`Server is up and running at ${PORT}`);
})