import React from 'react';
import PropTypes from 'prop-types';

const UserCard = props => {
  return (
    <div className='collection-item avatar chat-contacts-user-card'>
      <img src={placeholderImg} alt='' className='circle' />
      <p className='title chat-contacts-title'>Kelsey Szukhent</p>
      <p>
        <span className='chat-contacts-current-user'>You: </span> Hey there,
        this some test text...
      </p>
      <span className='secondary-content'>
        <i>8:10 PM</i>
      </span>
    </div>
  );
};

UserCard.propTypes = {};

export default UserCard;
