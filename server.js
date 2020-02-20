const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const path = require('path');

users = [];
connections = [];

server.listen(process.env.PORT || 3000);

console.log('Server running...');

app.use(express.static(path.join(__dirname, 'public')));
