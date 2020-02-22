import React, { Fragment } from 'react';
import Message from '../Message/Message';
import ScrollToBottom from 'react-scroll-to-bottom';

import '../Components.css';

const Messages = ({ messages, name }) => (
  <Fragment>
    {messages.map((message, i) => (
      <ScrollToBottom>
        <div>
          <Message message={message} name={name} />
        </div>
      </ScrollToBottom>
    ))}
  </Fragment>
);

export default Messages;
