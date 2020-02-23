import React from 'react';
import Message from '../Message/Message';

import '../Components.css';

export const Messages = ({ messages, name }) => (
  <div className='col s8 chat-feed'>
    {messages.map((message, i) => (
      <div key={i}>
        <Message message={message} name={name} />
      </div>
    ))}
  </div>
);

export default Messages;
