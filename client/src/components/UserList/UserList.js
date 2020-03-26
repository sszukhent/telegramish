import React, { Fragment } from 'react';
import UserCard from '../UserList/UserCard';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actions';
import '../Components.css';

export const UserList = props => {
  const { conversations, currUser } = props;

  console.log(currUser);
  console.log(conversations);

  // Remove the current logged in user from the contact list
  const conversationsList = conversations.filter(
    currConversation => currConversation.user._id !== currUser._id
  );

  console.log(conversationsList);

  // const lastMessage = messages.slice(-1)[0] || {};

  return (
    <Fragment>
      <div className='col s4 chat-contacts'>
        <div className='chat-contacts-scroll'>
          <ul className='collection'>
            {conversationsList.map((conversation, i) => (
              <div
                key={i}
                style={{
                  border: 'solid .1rem rgba(0, 0, 0, .1)',
                  paddingBottom: '.6rem'
                }}
              >
                <UserCard conversation={conversation} />
              </div>
            ))}
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  currUser: state.auth.user,
  users: state.auth.users,
  conversations: state.conversations.currentConversations
  // members: state.conversations.currentConversations[0].members,
  // messages: state.conversations.currentConversations[0].messages,
  // loading: state.auth.loading
});

export default connect(mapStateToProps, actionCreators)(UserList);
