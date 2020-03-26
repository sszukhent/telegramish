import React, { useState, useEffect, Fragment, lazy, Suspense } from 'react';
// import queryString from 'query-string';
import io from 'socket.io-client';
import Messages from '../Messages/Messages';
import UserList from '../UserList/UserList';
import ChatInput from '../ChatInput/ChatInput';
import RoomHeader from '../RoomHeader/RoomHeader';
import Search from '../Search/Search';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actions';
import { ENDPOINT } from '../../actions/constants';
// import PropTypes from 'prop-types';
import '../Components.css';

let socket;

const Chat = props => {
  const { setName, setRoom, setMessages, messages } = props;
  // const [name, setName] = useState('');
  // const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const messagesEndRef = React.createRef();
  const name = 'Sean';
  const room = 'Test Room';

  useEffect(() => {
    setName(name);
    setRoom(room);

    socket = io(ENDPOINT);

    socket.emit('join', { name, room }, () => {});
  }, [ENDPOINT]);

  useEffect(() => {
    socket.on('message', message => {
      setMessages([...messages, message]);
    });

    return () => {
      socket.emit('disconnect');

      socket.off();
    };
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
      {/* add className='container' when done */}
      <div id='app-container'>
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
            <Messages messagesEndRef={messagesEndRef} name={name} />
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

const mapStateToProps = state => ({
  messages: state.conversations.messages,
  users: state.auth.users,
  members: state.conversations.members,
  loading: state.auth.loading
  // name: state.auth.user.name,
  // room: state.auth.room
});

export default connect(mapStateToProps, actionCreators)(Chat);
