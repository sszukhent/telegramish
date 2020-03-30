import React, { useEffect, useState, Fragment } from 'react';
import Message from '../Message/Message';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../Components.css';

const Messages = props => {
  const { messagesEndRef, currentConversations } = props;
  const selectedConversation =
    currentConversations.length > 0
      ? currentConversations.filter(
          currConversation => currConversation.selected === true
        )
      : [];
  console.log(selectedConversation);
  return selectedConversation.length > 0 ? (
    <div className='col s8 chat-feed'>
      <div id='chat-feed-container'>
        {selectedConversation[0].messages.map((message, i) => (
          <div key={i}>
            <Message message={message} />
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>
    </div>
  ) : (
    <div className='col s8 chat-feed'>
      <div id='chat-feed-container'>
        <h6>No messages yet!</h6>

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

Messages.propTypes = {
  messages: PropTypes.array
};

const mapStateToProps = state => ({
  currentConversations: state.conversations.currentConversations
});

export default connect(mapStateToProps)(Messages);
