const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname,'/../public');

const PORT = process.env.PORT || 3000;;
var app = express();
var server = http.createServer(app);
var io  = socketIO(server);
var count =0;
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
        callback('This is from server');

        //socket.broadcast.emit('newMessage',generateMessage(message.from, message.text));

    });

    socket.on('disconnect',()=>{
        console.log('User was disconnected');
    });
});

// app.get('/',(req,res)=>{
//     res.send("Hello world");

// });

server.listen(PORT,()=>{
    console.log(`Server is up and running at ${PORT}`);
})