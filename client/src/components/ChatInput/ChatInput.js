import React from 'react';

import '../Components.css';

const ChatInput = ({ message, setMessage, sendMessage }) => {
  return (
    <div className='row app-footer'>
      <div id='chat-contacts-footer' className='col s4'></div>
      <div className='col s8'>
        <div className='row no-mp'>
          <div id='upload-btn' className='col s1'>
            <i className='fas fa-upload no-mp'></i>
          </div>
          <div id='chat-input-section' className='col s9'>
            <input
              placeholder='Type a message...'
              type='text'
              className='col s8'
              value={message}
              onChange={({ target: { value } }) => setMessage(value)}
              onKeyPress={event =>
                event.key === 'Enter' ? sendMessage(event) : null
              }
            />
          </div>
          <div id='submit-btn' className='col s1 offset-s1'>
            <i
              className='far fa-paper-plane no-mp'
              onClick={e => sendMessage(e)}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
