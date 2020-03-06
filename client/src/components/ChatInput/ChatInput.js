import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actions';

import '../Components.css';

const ChatInput = ({
  message,
  setMessage,
  sendMessage,
  logout,
  currentUser
}) => {
  return (
    <div className='row app-footer'>
      <div id='chat-contacts-footer' className='col s4'>
        <div id='currentUserFooter' className='row'>
          <span>
            <span style={{ fontWeight: '600' }}>Current user:</span>{' '}
            {currentUser}
          </span>
        </div>
        <div className='row no-margin' style={{ color: '#02bee8' }}>
          <Link
            onClick={() => {
              logout();
            }}
          >
            Logout <i className='fas fa-sign-out-alt' />
          </Link>
        </div>
      </div>
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

const mapStateToProps = state => ({
  currentUser: state.auth.user.name
});

export default connect(mapStateToProps, actionCreators)(ChatInput);
