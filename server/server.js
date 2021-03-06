const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const http = require('http');
const socketio = require('socket.io');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Connect to DB
connectDB();

// Init middleware
app.use(cors());
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/conversations', require('./routes/api/conversations'));
app.use('/api/messages', require('./routes/api/messages'));

// Run when client connects
io.on('connection', (socket) => {
  socket.on('join', ({ user, roomId }) => {
    console.log('Join room: ' + user.name, roomId, socket.id);
    // Join the room
    socket.join(roomId);

    // Send welcome message as test
    io.of('/')
      .in(roomId)
      .clients((error, rooms) => {
        console.log(rooms);
      });
  });

  // Incoming message from client
  socket.on('messageToServer', ({ roomId, name, message }) => {
    // Received message sent back to all in the room
    io.to(roomId).emit('messageFromServer', { roomId, name, message });

    console.log('Send Message: ' + roomId, message);
  });

  // Someone is typing
  socket.on('clientIsTyping', ({ startTyping, roomId, currentUser }) => {
    console.log(
      currentUser.name + ' Started typing in room: ' + roomId,
      startTyping
    );
    io.to(roomId).emit('serverSendTyping', {
      startTyping,
      roomId,
      currentUser,
    });
  });

  //  Run when client disconnects
  socket.on('disconnect', () => {
    console.log('User left the server.');
  });
});

app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
