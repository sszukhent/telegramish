import React from 'react';
import Message from '../Message/Message';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import '../Components.css';

export const Messages = ({ messages, name }) => (
  <div className='col s8 chat-feed'>
    <div id='chat-feed-container'>
      {messages.map((message, i) => (
        <div key={i}>
          <Message message={message} name={name} />
        </div>
      ))}
    </div>
  </div>
);

Messages.propTypes = {
  messages: PropTypes.array
};

const mapStateToProps = state => ({
  messages: state.messageReducer.messages
});

export default connect(mapStateToProps)(Messages);
