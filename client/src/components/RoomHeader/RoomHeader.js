import React, { Fragment } from 'react';

import '../Components.css';

export const RoomHeader = () => {
  return (
    <Fragment>
      <div className='col s8 '>
        <div id='chat-header-current'>
          <div className='row no-margin'>
            <span className='flow-text'>Sean</span>
          </div>
          <div className='row no-margin'>
            <span>1 Member</span>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default RoomHeader;
