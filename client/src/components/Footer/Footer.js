import React, { Fragment } from 'react';

import '../Components.css';

const Footer = () => {
  return (
    <Fragment>
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
            />
          </div>
          <div id='submit-btn' className='col s1 offset-s1'>
            <i className='far fa-paper-plane no-mp'></i>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Footer;
