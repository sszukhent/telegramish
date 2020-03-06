import React, { Fragment } from 'react';
// import { connect } from 'react-router-dom';
import '../Components.css';
// import placeholderImg from '../../img/placeholder.png';

export const UserList = () => {
  return (
    <Fragment>
      <div className='col s4 chat-contacts'>
        <div className='chat-contacts-scroll'>
          <ul className='collection'>
            {/* <li className='collection-item avatar chat-contacts-user-card'>
              <img src={placeholderImg} alt='' className='circle' />
              <p className='title chat-contacts-title'>Kelsey Szukhent</p>
              <p>
                <span className='chat-contacts-current-user'>You: </span> Hey
                there, this some test text...
              </p>
              <span className='secondary-content'>
                <i>8:10 PM</i>
              </span>
            </li> */}
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

// const mapStateToProps = state => ({
//   userCard: state.
// })

export default UserList;
