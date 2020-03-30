import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import placeholderImg from '../../img/placeholder.png';
import * as actionCreators from '../../actions/actions';

const UserCard = props => {
  const {
    currUser,
    // lastMessage: { text, created },
    conversation: { _id, members, selected },
    selectConvo,
    setName,
    setRoom,
    joinRoom
  } = props;
  let text;

  // const timestamp = !created ? '' : Date.parse(created); // This would be the timestamp you want to format

  // const currTime = new Intl.DateTimeFormat('en-US', {
  //   hour: '2-digit',
  //   minute: '2-digit'
  // }).format(timestamp);

  // Trim the string for preview text

  const convoCardMembers = members.filter(
    member => member._id !== currUser._id
  );

  const userName = currUser.name;

  console.log(_id, selected);
  const previewLength = 30;
  const previewText = !text
    ? 'No conversations with this user'
    : text.substring(0, previewLength);

  console.log(convoCardMembers);
  // enterConvo(_id)
  return (
    <div
      id={_id}
      className='collection-item avatar chat-contacts-user-card'
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
        <span className='chat-contacts-current-user'>You: </span>{' '}
        {`${previewText}...`}
      </p>
      <span className='secondary-content'>
        <i>{'currTime'}</i>
      </span>
    </div>
  );
};

const mapStateToProps = state => ({
  currUser: state.auth.user,
  currentConversations: state.currentConversations
});

export default connect(mapStateToProps, actionCreators)(UserCard);
