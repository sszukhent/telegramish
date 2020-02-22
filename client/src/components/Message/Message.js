import React, { Fragment } from 'react';

import '../Components.css';

const Message = ({ message: { user, text }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name;

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <Fragment>
      <div className='col s8 speech-bubble-user'>
        <h6 className='speech-bubble-name'>
          {user}
          <span className='speech-bubble-time'> 8:10 pm</span>
        </h6>
        <p>{text}</p>
      </div>
    </Fragment>
  ) : (
    <Fragment>
      <div className='col s8 offset-s4 speech-bubble-contact'>
        <h6 className='speech-bubble-name'>
          {trimmedName}
          <span className='speech-bubble-time'> 8:10 pm</span>
        </h6>
        <p>{text}</p>
      </div>
    </Fragment>
  );
};

export default Message;
