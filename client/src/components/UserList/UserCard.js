import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import placeholderImg from '../../img/placeholder.png';

const UserCard = props => {
  const {
    currUser,
    lastMessage: { text, created },
    listUser: { _id, name }
  } = props;
  const timestamp = !created ? '' : Date.parse(created); // This would be the timestamp you want to format

  const currTime = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(timestamp);

  // Trim the string for preview text
  const previewLength = 30;
  const previewText = !text
    ? 'No conversations with this user'
    : text.substring(0, previewLength);

  return (
    <div
      id={_id}
      className='collection-item avatar chat-contacts-user-card'
      onClick={() =>
        console.log(
          'Current contact id: ' + _id,
          'and',
          'Current user id: ' + currUser._id
        )
      }
    >
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

const mapStateToProps = state => ({
  currUser: state.auth.user
});

export default connect(mapStateToProps)(UserCard);
