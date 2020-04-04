import React from 'react';
import ReactEmoji from 'react-emoji';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import '../Components.css';

export const Message = ({
  currUserName,
  message: {
    text,
    user: { name },
    created,
  },
}) => {
  let isSentByCurrentUser = name === currUserName;

  const trimmedName = name.trim().toLowerCase();

  const timestamp = Date.parse(created); // This would be the timestamp you want to format

  const currTime = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(timestamp);

  if (name === trimmedName) {
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
        {name}
        <span className='speech-bubble-time'> {currTime}</span>
      </h6>
      <p>{ReactEmoji.emojify(text)}</p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currUserName: state.auth.user.name,
});

export default connect(mapStateToProps)(Message);
