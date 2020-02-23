import React from 'react';
import Message from '../Message/Message';
import ScrollToBottom from 'react-scroll-to-bottom';

import '../Components.css';

export const Messages = ({ messages, name }) => (
  <ScrollToBottom className='col s8 chat-feed'>
    <div id='chat-feed-container'>
      {messages.map((message, i) => (
        <div key={i}>
          <Message message={message} name={name} />
        </div>
      ))}
    </div>
  </ScrollToBottom>
);

export default Messages;
