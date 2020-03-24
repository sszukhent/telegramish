import React, { Fragment } from 'react';
import UserCard from '../UserList/UserCard';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actions';
import '../Components.css';

export const UserList = props => {
  const { messages, users, loading, currUser } = props;

  console.log(currUser);

  // Remove the current logged in user from the contact list
  const usersList = users.filter(user => user._id !== currUser._id);

  console.log(usersList);

  const lastMessage = messages.slice(-1)[0] || {};

  return !loading ? (
    <Fragment>
      <div className='col s4 chat-contacts'>
        <div className='chat-contacts-scroll'>
          <ul className='collection'>
            {usersList.map((listUser, i) => (
              <div
                key={i}
                style={{
                  border: 'solid .1rem rgba(0, 0, 0, .1)',
                  paddingBottom: '.6rem'
                }}
              >
                <UserCard
                  loading={loading}
                  listUser={listUser}
                  lastMessage={lastMessage}
                />
              </div>
            ))}
          </ul>
        </div>
      </div>
    </Fragment>
  ) : (
    <div>Loading..</div>
  );
};

const mapStateToProps = state => ({
  currUser: state.auth.user,
  users: state.auth.users,
  members: state.conversations.members,
  messages: state.conversations.messages,
  loading: state.auth.loading
});

export default connect(mapStateToProps, actionCreators)(UserList);
