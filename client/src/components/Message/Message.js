import React from 'react';
import ReactEmoji from 'react-emoji';

import '../Components.css';

export const Message = ({ message: { user, text }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  const timestamp = Date.now(); // This would be the timestamp you want to format

  const currTime = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(timestamp);

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div id='speech-bubble-user' className='col s8 offset-s4'>
      <h6 className='speech-bubble-name'>
        {trimmedName}
        <span className='speech-bubble-time'> {currTime}</span>
      </h6>
      <p>{ReactEmoji.emojify(text)}</p>
    </div>
  ) : (
    <div id='speech-bubble-contact' className='col s8'>
      <h6 className='speech-bubble-name'>
        {user}
        <span className='speech-bubble-time'> {currTime}</span>
      </h6>
      <p>{ReactEmoji.emojify(text)}</p>
    </div>
  );
};

export default Message;
