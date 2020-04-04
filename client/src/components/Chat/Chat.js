import React from 'react';
import Messages from '../Messages/Messages';
import UserList from '../UserList/UserList';
import ChatInput from '../ChatInput/ChatInput';
import RoomHeader from '../RoomHeader/RoomHeader';
import Search from '../Search/Search';
import '../Components.css';

const Chat = () => {
  const messagesEndRef = React.createRef();
  return (
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
          <ChatInput />
        </div>
      </div>
    </div>
  );
};

export default Chat;
