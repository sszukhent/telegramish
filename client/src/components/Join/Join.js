import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Join.css';

const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <main id='join-form-wrapper'>
      <center>
        <h5 id='login-title'>Telegramish</h5>

        <div className='container'>
          <div
            className='form-container z-depth-1 grey lighten-4 row'
            style={{
              display: 'inline-block;',
              padding: '32px 48px 0px 48px;',
              border: '1px solid #EEE;'
            }}
          >
            <form className='col s12' method='post'>
              <div className='row'>
                <div className='col s12'></div>
              </div>

              <div className='row'>
                <div className='input-field col s12'>
                  <input
                    className='validate'
                    placeholder='Email'
                    type='email'
                    name='email'
                    id='email'
                    onChange={event => setName(event.target.value)}
                  />
                </div>
              </div>

              <div className='row'>
                <div className='input-field col s12'>
                  <input
                    className='validate'
                    placeholder='Password'
                    type='password'
                    name='password'
                    id='password'
                    onChange={event => setRoom(event.target.value)}
                  />
                </div>
              </div>

              <br />
              <center>
                <div className='row'>
                  <Link
                    onClick={event =>
                      !name || !room ? event.preventDefault() : null
                    }
                    to={`/chat?name=${name}&room=${room}`}
                  >
                    <button
                      type='submit'
                      name='btn_login'
                      id='submit-btn'
                      className='col s12 btn btn-large waves-effect'
                    >
                      Login
                    </button>
                  </Link>
                </div>
              </center>
            </form>
          </div>
        </div>
        <a href='#!'>Create account</a>
      </center>
    </main>
  );
};

export default Join;
