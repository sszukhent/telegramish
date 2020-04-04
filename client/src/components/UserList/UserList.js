import React, { useEffect, Fragment } from 'react';
import UserCard from '../UserList/UserCard';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actions';
import '../Components.css';

export const UserList = (props) => {
  const { conversations, currUser } = props;

  const conversationsList =
    conversations.length > 0
      ? conversations.filter((currConversation) =>
          currConversation.members.find((member) => member._id === currUser._id)
        )
      : [];

  console.log(conversationsList);

  // const lastMessage = messages.slice(-1)[0] || {};

  return conversationsList.length > 0 ? (
    <Fragment>
      <div className='col s4 chat-contacts'>
        <div className='chat-contacts-scroll'>
          <ul className='collection'>
            {conversationsList.map((conversation, i) => (
              <div
                key={i}
                style={{
                  border: 'solid .1rem rgba(0, 0, 0, .1)',
                  paddingBottom: '.6rem',
                }}
              >
                <UserCard conversation={conversation} />
              </div>
            ))}
          </ul>
        </div>
      </div>
    </Fragment>
  ) : (
    <Fragment>
      <div className='col s4 chat-contacts'>
        <div className='chat-contacts-scroll'>
          <div>
            <p>{conversations.msg}</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  currUser: state.auth.user,
  users: state.auth.users,
  conversations: state.conversations.currentConversations,
});

export default connect(mapStateToProps, actionCreators)(UserList);
