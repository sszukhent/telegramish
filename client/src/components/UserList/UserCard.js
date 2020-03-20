import React from 'react';
import PropTypes from 'prop-types';
import placeholderImg from '../../img/placeholder.png';

const UserCard = props => {
  const {
    lastMessage: { text, created },
    user: { name }
  } = props;
  const timestamp = Date.parse(created); // This would be the timestamp you want to format

  const currTime = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(timestamp);

  // Trim the string for preview text
  const previewLength = 30;
  const previewText = text.substring(0, previewLength);

  return (
    <div className='collection-item avatar chat-contacts-user-card'>
      <img src={placeholderImg} alt='' className='circle' />
      <p className='title chat-contacts-title'>{name}</p>
      <p>
        <span className='chat-contacts-current-user'>You: </span>{' '}
        {`${previewText}...`}
      </p>
      <span className='secondary-content'>
        <i>{currTime}</i>
      </span>
    </div>
  );
};

UserCard.propTypes = {};

export default UserCard;
