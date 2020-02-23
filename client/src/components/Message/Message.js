import React, { Fragment } from 'react';

import '../Components.css';

export const Message = ({ message: { user, text }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name;

  console.log(name);

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <Fragment>
      <div id='speech-bubble-user' className='col s8'>
        <h6 className='speech-bubble-name'>
          {trimmedName}
          <span className='stlyes.speech-bubble-time'> 8:10 pm</span>
        </h6>
        <p>{text}</p>
      </div>
    </Fragment>
  ) : (
    <Fragment>
      <div id='speech-bubble-contact' className='col s8 offset-s4'>
        <h6 className='speech-bubble-name'>
          {user}
          <span className='speech-bubble-time'> 8:10 pm</span>
        </h6>
        <p>{text}</p>
      </div>
    </Fragment>
  );
};

export default Message;
