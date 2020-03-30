import React, { useState, useEffect, Fragment, lazy, Suspense } from 'react';
// import queryString from 'query-string';
// import io from 'socket.io-client';
import socket from '../../utils/socketConnection';
import Messages from '../Messages/Messages';
import UserList from '../UserList/UserList';
import ChatInput from '../ChatInput/ChatInput';
import RoomHeader from '../RoomHeader/RoomHeader';
import Search from '../Search/Search';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actions';
import { ENDPOINT } from '../../actions/constants';
import messageFormat from './MessageFormat';
// import PropTypes from 'prop-types';
import '../Components.css';
// const socket = io(ENDPOINT, {
//   transports: ['websocket', 'polling']
// });

const Chat = props => {
  const { name, roomId, setMessages } = props;
  const [message, setMessage] = useState('');
  const messagesEndRef = React.createRef();
  console.log(roomId);
  // console.log(io);

  // Join the room
  useEffect(() => {
    console.log('I was triggered during componentDidMount');

    return () => {
      socket.emit('disconnect', name);

      socket.off();
    };
  }, []);

  // Set messages
  useEffect(() => {
    console.log('I was triggered during sendMessage');

    socket.on('message', message => {
      setMessages(messageFormat(name, message));
    });
  }, [socket]);

  return (
    console.log('I was triggered during render ' + socket.id),
    (
      <Fragment>
        {/* add className='container' when done */}
        <div id='app-container'>
          <div id='wrapper' className='card'>
            <div className='row app-header' style={{ margin: '0 auto' }}>
              <Search />

              <RoomHeader />
            </div>

            <div
              className='row app-body'
              style={{ minHeight: '82vh', margin: '0 auto' }}
            >
              <UserList />
              <Messages messagesEndRef={messagesEndRef} />
              <ChatInput
                message={message}
                setMessage={setMessage}
                // sendMessage={sendMessage}
              />
            </div>
          </div>
        </div>
      </Fragment>
    )
  );
};

const mapStateToProps = state => ({
  messages: state.conversations.messages,
  users: state.auth.users,
  members: state.conversations.members,
  loading: state.auth.loading,
  name: state.chat.name,
  roomId: state.chat.roomId,
  currentConversations: state.currentConversations
});

export default connect(mapStateToProps, actionCreators)(Chat);
