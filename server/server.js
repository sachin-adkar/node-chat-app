const path = require('path');
const express = require('express');
const http = require('http');

//socket.io is used for client-server interaction
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'../public');
const app = express();
const port = process.env.PORT || 3000;

var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

//register an event listner and do something when that event happens
io.on('connection',(socket)=>{
console.log('New user connected');
socket.on('disconnect', ()=>{
console.log('Client disconnected');

});
});


server.listen(3000, ()=>{
    console.log('Server is running on port ', port);
    
})


 