import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import placeholderImg from '../../img/placeholder.png';
import * as actionCreators from '../../actions/actions';

const UserCard = (props) => {
  const {
    currUser,
    conversation: { _id, members, messages, typing, userTyping },
    selectConvo,
    setName,
    setRoom,
    joinRoom,
  } = props;

  const lastMessage = messages.slice(-1)[0] || {};

  const { text, created } = lastMessage;
  const timestamp = !created ? '' : Date.parse(created);

  const currTime = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(timestamp);

  const convoCardMembers = members.filter(
    (member) => member._id !== currUser._id
  );

  const userName = currUser.name;

  const previewLength = 30;
  const previewText = !text
    ? 'No conversations with this user'
    : text.substring(0, previewLength);

  // enterConvo(_id)
  return (
    <div
      id={_id}
      className='collection-item avatar chat-contacts-user-card'
      onLoad={() => {
        joinRoom(currUser, _id);
      }}
      onClick={() => {
        selectConvo(_id);
        setName(userName);
        setRoom(_id, members);
        joinRoom(currUser, _id);
      }}
    >
      <img src={placeholderImg} alt='' className='circle' />
      {convoCardMembers.map((member, i) => (
        <div key={i}>
          <p className='title chat-contacts-title'>{member.name}</p>
        </div>
      ))}

      <p>
        <span className='chat-contacts-current-user'>Last: </span>{' '}
        {typing && userTyping !== currUser.name
          ? `${userTyping} is typing...`
          : `${previewText}...`}
      </p>
      <span className='secondary-content'>
        <i>{!text ? '' : currTime}</i>
      </span>
    </div>
  );
};

const mapStateToProps = (state) => ({
  typing: state.conversations.currentConversations.find(
    (x) => x.typing === true
  ),

  userTyping: state.conversations.currentConversations.find(
    (x) => x.userTyping.length > 0
  ),
  currUser: state.auth.user,
  currentConversations: state.conversations.currentConversations,
});

export default connect(mapStateToProps, actionCreators)(UserCard);
