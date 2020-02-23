import React, { Fragment } from 'react';
import Message from '../Message/Message';
import ScrollToBottom from 'react-scroll-to-bottom';

import '../Components.css';

export const Messages = ({ messages, name }) => (
  <Fragment>
    {messages.map((message, i) => (
      <div key={i}>
        <Message message={message} name={name} />
      </div>
    ))}
  </Fragment>
);

export default Messages;
