import React, { useState, useEffect, Fragment } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import Messages from '../Messages/Messages';

import '../Components.css';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'localhost:5000';

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

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
      <div className='col s8 chat-feed'>
        <Messages messages={messages} />
      </div>

      <div className='row app-footer'>
        <div id='chat-contacts-footer' className='col s4'></div>
        <div className='col s8'>
          <div className='row no-mp'>
            <div id='upload-btn' className='col s1'>
              <i className='fas fa-upload no-mp'></i>
            </div>
            <div id='chat-input-section' className='col s9'>
              <input
                placeholder='Type a message...'
                type='text'
                className='col s8'
                value={message}
                onChange={event => setMessage(event.target.value)}
                onKeyPress={event =>
                  event.key === 'Enter' ? sendMessage(event) : null
                }
              />
            </div>
            <div id='submit-btn' className='col s1 offset-s1'>
              <i className='far fa-paper-plane no-mp'></i>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Chat;
