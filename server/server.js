const path = require('path');
// console.log(__dirname+'/../public');
// console.log(publicPath);
const express = require('express');
var app = express();

const publicPath = path.join(__dirname,'/../public');
const PORT = process.env.PORT || 3000;;

app.use(express.static((publicPath)));

app.get('/',(req,res)=>{
    res.send("Hello world");

});

app.listen(PORT,()=>{
    console.log(`Server is up and running at ${PORT}`);
})