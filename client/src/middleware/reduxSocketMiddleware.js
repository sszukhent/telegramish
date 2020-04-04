import io from 'socket.io-client';
import store from '../store';
import messageFormat from '../utils/messageFormat';
import { SET_MESSAGES, ENDPOINT } from '../actions/constants';

export default function socketMiddleware() {
  const socket = io.connect(ENDPOINT);

  socket.on('messageFromServer', ({ roomId, name, message }) => {
    console.log(roomId, name, message);
    const messageFormatted = messageFormat(name, message);
    console.log(messageFormatted);
    store.dispatch({
      type: SET_MESSAGES,
      payload: { roomId, messageFormatted },
    });
  });

  return ({ dispatch }) => (next) => (action) => {
    if (typeof action === 'function') {
      return next(action);
    }

    const { event, leave, handle, emit, fromServer, payload, ...rest } = action;

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

    let handleEvent = handle;
    if (typeof handleEvent === 'string') {
      handleEvent = (result) => dispatch({ type: handle, result, ...rest });
    }
    return socket.on(event, handleEvent);
  };
}
