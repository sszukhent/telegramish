import React, { useState, useEffect, Fragment } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import Messages from '../Messages/Messages';
import UserList from '../UserList/UserList';
import ChatInput from '../ChatInput/ChatInput';
import RoomHeader from '../RoomHeader/RoomHeader';
import Search from '../Search/Search';

import '../Components.css';

let socket;

export const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'localhost:5000';

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    setName(name);
    setRoom(room);

    socket = io(ENDPOINT);

    socket.emit('join', { name, room }, () => {});

    return () => {
      socket.emit('disconnect');

      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', message => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  // Sending messages
  const sendMessage = event => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  return (
    <Fragment>
      <div id='app-container' className='container'>
        <div id='wrapper' className='card'>
          <div className='row app-header' style={{ margin: '0 auto' }}>
            <Search />
            <RoomHeader room={room} />
          </div>

          <div
            className='row app-body'
            style={{ minHeight: '82vh', margin: '0 auto' }}
          >
            <UserList />
            <Messages messages={messages} name={name} />
            <ChatInput
              message={message}
              setMessage={setMessage}
              sendMessage={sendMessage}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Chat;
