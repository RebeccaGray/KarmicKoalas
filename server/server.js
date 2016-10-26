'use strict';
const dotenv = require('dotenv').config({path: __dirname + '/config.env'});
const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 8000;
const INDEX = path.join(__dirname, '../landing/index.html');
const app = require('./api');
const server = require('http').Server(app)

app.use(express.static(path.join(__dirname, '../landing/')));
app.use(express.static(path.join(__dirname, '../node_modules/')));
server.listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = require('socket.io')(server);
var myRoom = '1';

const db = require('./db/config');

io.on('connection', (socket) => {
            console.log('Client connected');

            socket.on('initialize', (data) => {
                socket.leave(myRoom);
                myRoom = data.eventId;
                socket.join(data.eventId);
            });

            socket.on('location', (data) => {
                io.to(data.eventId).emit('groupUpdate', data);
            });

            socket.on('tweet', (data) => {
                io.to(data.eventId).emit('tweet', data.text);
            });

            socket.on('error', (err) => {
                console.log("Error", err);
            });

            socket.on('disconnect', () => console.log('Client disconnected'));

 });
