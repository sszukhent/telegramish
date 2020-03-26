import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actions';
import Modal from 'react-modal';
import '../Components.css';
import '../ModalStyles/Modal.css';
import { UserList } from '../UserList/UserList';
Modal.setAppElement('#root');

const ChatInput = ({
  message,
  setMessage,
  sendMessage,
  logout,
  currentUser,
  users,
  newConvo
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const usersList = users.filter(user => user._id !== currentUser._id);

  let timestamp;
  let date;

  return (
    <div className='row app-footer'>
      <div id='chat-contacts-footer' className='col s4'>
        <div id='currentUserFooter' className='row'>
          <span>
            <span style={{ fontWeight: '600' }}>Current user:</span>{' '}
            {currentUser.name}
          </span>
        </div>
        <div className='row no-margin' style={{ color: '#02bee8' }}>
          <div className='col s3'>
            <Link
              onClick={() => {
                logout();
              }}
            >
              Logout <i className='fas fa-sign-out-alt' />
            </Link>
          </div>
          <div className='col s6 offset-s3'>
            <Link
              onClick={() => {
                // This is NOT correct. newConvo will only run in the new user selection window, to create a new conversation
                setModalIsOpen(true);
              }}
            >
              <i className='fas fa-plus' /> New Conversation
            </Link>
          </div>
        </div>
      </div>
      <div className='col s8'>
        <div className='row no-mp'>
          <div id='upload-btn' className='col s1'>
            <i className='fas fa-upload no-mp'></i>
          </div>
          <div id='chat-input-section' className='col s9'>
            <input
              placeholder='Type a message...'
              type='text'
              className='col s8'
              value={message}
              onChange={({ target: { value } }) => setMessage(value)}
              onKeyPress={event =>
                event.key === 'Enter' ? sendMessage(event) : null
              }
            />
          </div>
          <div id='submit-btn-chat' className='col s1 offset-s1'>
            <i
              className='far fa-paper-plane no-mp'
              onClick={e => sendMessage(e)}
            ></i>
          </div>
        </div>
      </div>
      {/* Modal for adding new conversation */}
      <Modal isOpen={modalIsOpen}>
        <div className='container bootstrap snippet'>
          <h4>
            <i class='small material-icons'>person_add</i> New Conversation
          </h4>
          <p>Click 'Add User' to start a new chat.</p>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='main-box no-header clearfix'>
                <div className='main-box-body clearfix'>
                  <div className='table-responsive'>
                    <table className='table user-list'>
                      <thead>
                        <tr>
                          <th>
                            <span>User</span>
                          </th>
                          <th>
                            <span>Joined</span>
                          </th>
                          <th className='text-center'>
                            <span>Status</span>
                          </th>
                          <th>
                            <span>Email</span>
                          </th>
                          <th>&nbsp;</th>
                        </tr>
                      </thead>
                      <tbody>
                        {usersList.map((listUser, i) => (
                          <tr key={i}>
                            <td>
                              <img src={listUser.avatar} alt='' />
                              <a href='#' className='user-link'>
                                {listUser.name}
                              </a>
                              <span className='user-subhead'>Member</span>
                            </td>
                            <td>
                              {
                                ((timestamp = Date.parse(listUser.date)),
                                (date = new Intl.DateTimeFormat('en-US', {
                                  'es-US': 'M/d/yyyy'
                                }).format(timestamp)),
                                date)
                              }
                            </td>
                            <td className='text-center'>
                              <span className='label label-default'>
                                pending
                              </span>
                            </td>
                            <td>
                              <a href='#'>{listUser.email}</a>
                            </td>
                            <td style={{ width: '20%' }}>
                              <button className='btn'>Add User</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            className='waves-effect waves-light btn red'
            onClick={() => {
              setModalIsOpen(false);
            }}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = state => ({
  currentUser: state.auth.user,
  users: state.auth.users
});

export default connect(mapStateToProps, actionCreators)(ChatInput);
