import React, { useState, useEffect, Fragment } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import Messages from '../Messages/Messages';
import UserList from '../UserList/UserList';
import ChatInput from '../ChatInput/ChatInput';
import RoomHeader from '../RoomHeader/RoomHeader';
import Search from '../Search/Search';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actions';
import PropTypes from 'prop-types';

import '../Components.css';

let socket;

const Chat = props => {
  const { location, setMessages, messages } = props;
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
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

  console.log(messages);

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
            <Messages name={name} />
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

Chat.propTypes = {
  messages: PropTypes.array.isRequired,
  setMessages: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  setMessages: state.messageReducer.setMessages,
  messages: state.messageReducer.messages
});

export default connect(mapStateToProps, actionCreators)(Chat);
