import io from 'socket.io-client';

export default function socketMiddleware() {
  const socket = io.connect('http://localhost:5000', {
    transports: ['websocket', 'polling']
  });

  return ({ dispatch }) => next => action => {
    if (typeof action === 'function') {
      return next(action);
    }

    const { event, leave, handle, emit, payload, ...rest } = action;

    if (!event) {
      return next(action);
    }

    if (leave) {
      socket.removeListener(event);
    }

    // Sends data from client to server
    if (emit) {
      socket.emit(event, payload);
      console.log(payload);
      return;
    }
    // Receiving data from server to client
    if (socket.on('messageFromServer')) {
      console.log('Yup, I just got triggered!');
    }

    let handleEvent = handle;
    if (typeof handleEvent === 'string') {
      handleEvent = result => dispatch({ type: handle, result, ...rest });
    }
    return socket.on(event, handleEvent);
  };
}
