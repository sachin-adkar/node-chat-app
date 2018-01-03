const path = require('path');
const express = require('express');
const http = require('http');

//socket.io is used for client-server interaction
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const app = express();
const port = process.env.PORT || 3000;

var server = http.createServer(app); //equivalent to app = express()

//we get access to server via server var, we get back socket server
// using this we can emit or listen to the events
var io = socketIO(server);

app.use(express.static(publicPath));

//registering event listner and do something when that event happens
io.on('connection', (socket) => {  //listen for a new connection
    console.log('New user connected');

//emit(create) events
    socket.emit('newMessage', {    //sending the information as the second argument
        from: "Sachin",
        text: "Hey, Everything is awesome",
        createdAt: 124
    });
 //setting event listner to catch the request from the client
    socket.on('createMessage', (newMessage) => {
        console.log("New message", newMessage);
    });


    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});


server.listen(3000, () => {
    console.log('Server is running on port ', port);

})


