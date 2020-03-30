import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import '../Components.css';

export const RoomHeader = props => {
  const { roomMembers } = props;

  return (
    <Fragment>
      <div className='col s8 '>
        <div id='chat-header-current'>
          <div className='row no-margin'>
            <span className='flow-text'>
              {roomMembers.toString().replace(',', ', ')}
            </span>
            {/* <span className='col s2 offset-s10'>Logout</span> */}
          </div>
          <div className='row no-margin'>
            <span>1 Member</span>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  roomMembers: state.chat.roomNames
});

export default connect(mapStateToProps)(RoomHeader);
