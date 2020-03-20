import React, { Fragment, useEffect } from 'react';
import UserCard from '../UserList/UserCard';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actions';
import '../Components.css';

export const UserList = props => {
  const { members, messages, users, loading, stateLoaded } = props;

  useEffect(() => {
    if (users.length && members.length && messages.length && loading) {
      stateLoaded();
    }
    return;
  }, [props]);
  const lastMessage = messages.slice(-1)[0] || {};

  return (
    <Fragment>
      <div className='col s4 chat-contacts'>
        <div className='chat-contacts-scroll'>
          <ul className='collection'>
            {!loading &&
              users.map((user, i) => (
                <div
                  key={i}
                  style={{
                    border: 'solid .1rem rgba(0, 0, 0, .1)',
                    paddingBottom: '.6rem'
                  }}
                >
                  <UserCard user={user} lastMessage={lastMessage} />
                </div>
              ))}
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  users: state.auth.users,
  loading: state.auth.loading,
  members: state.conversations.members,
  messages: state.conversations.messages
});

export default connect(mapStateToProps, actionCreators)(UserList);
