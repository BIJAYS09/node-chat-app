const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

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

    socket.emit('newMessage',{
        from:'ServerToClient@gmail.com',
        text:'Hello from server',
        createdAt: new Date().getTime()
    })

    socket.on('createMessage',(message)=>{
        console.log('create message',message);
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