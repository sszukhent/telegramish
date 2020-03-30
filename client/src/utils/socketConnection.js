import io from 'socket.io-client';

let socket = io.connect('http://localhost:5000', {
  transports: ['websocket', 'polling']
});

console.log(socket);

export default socket;
