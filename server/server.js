'use strict'

const express = require('express')
//const app = express();
//const http = require('http')
//const server = require('http').Server(app);
const PORT = process.env.PORT || 3001;
app.use(express.static('../'));
const socketIO = require('socket.io');
//var api = require("./api");
var rooms = {}  //a place to store groups {socketId:roomId,socketId:roomId,...}

const server = express()
 .listen(port, ()=>
  console.log('server listening on ${ PORT } ')
  );

// use socket.io
cosnt io = socketIO(server);


//turn off debug
//io.set('log level', 1);

// define interactions with client
io.sockets.on('connection', (socket)=>{
     console.log('client connected')
    //rooms.socket = roomId //where do i get the roomId for this user?
    //socket.join(roomId)
     socket.on('message', (data)=>{
      console.log("Incoming message From: ", data)

           socket.emit('messageUpdate', {'user':user,'text':'i am a message'})
 

       });

     socket.on('location', (data) =>{
      //sending dummy data for group update 
      console.log("Incoming location:", data);
      
 
            socket.emit('groupUpdate', {'group':[{'latitude': data.coordinates.latitude, 'longitude':  data.coordinates.longitude, 'title': 'Konst' }, {'latitude':data.coordinates.latitude + 0.0008, 'longitude': data.coordinates.longitude, 'title': 'Bo' }]});
    });


    socket.on('error', (err) =>{
          console.log("Error", err);
    });

    socket.on('disconnect', () => console.log('Client disconnected'))
});
setInterval(() => io.emit('time', new Date().toTimeString()), 1000);


module.exports = app;
