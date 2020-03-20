import React from 'react';
import Message from '../Message/Message';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../Components.css';

const Messages = props => {
  const { messages, messagesEndRef, name } = props;
  console.log(messages);

  const scrollIntoView = require('scroll-into-view');

  scrollIntoView(messagesEndRef, { behavior: 'smooth' });

  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);

  return (
    <div className='col s8 chat-feed'>
      <div id='chat-feed-container'>
        {messages.map((message, i) => (
          <div key={i}>
            <Message message={message} name={name} />
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

Messages.propTypes = {
  messages: PropTypes.array
};

const mapStateToProps = state => ({
  messages: state.conversations.messages
});

export default connect(mapStateToProps)(Messages);
