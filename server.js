const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

users = [];
connections = [];

server.listen(process.env.PORT || 3000);

console.log('Server running...');

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/design/index.html');
});
