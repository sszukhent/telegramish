import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actions';
import './Auth.css';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const inputToState = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitForm = async e => {
    e.preventDefault();
    if (!email || !password) {
      console.log('Valid email and password required');
    } else {
      login(email, password);
    }
  };

  // Redirect when logged in
  if (isAuthenticated) {
    return <Redirect to='/Chat' />;
  }

  return (
    <main id='join-form-wrapper'>
      <center>
        <h5 id='login-title'>
          <i class='fas fa-bolt'></i> Amp Login
        </h5>

        <div className='container'>
          <div
            className='form-container z-depth-1 grey lighten-4 row'
            style={{
              display: 'inline-block',
              padding: '32px 48px 0px 48px',
              border: '1px solid #EEE'
            }}
          >
            <form className='col s12' onSubmit={e => submitForm(e)}>
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
                    value={email}
                    onChange={e => inputToState(e)}
                  />
                </div>
              </div>

              <div className='row mb0'>
                <div className='input-field col s12'>
                  <input
                    className='validate'
                    placeholder='Password'
                    type='password'
                    name='password'
                    id='password'
                    value={password}
                    onChange={e => inputToState(e)}
                  />
                </div>
              </div>

              <br />
              <center>
                <div className='row'>
                  <button
                    type='submit'
                    name='btn_login'
                    id='submit-btn'
                    className='col s12 btn btn-large waves-effect'
                  >
                    Login
                  </button>
                </div>
              </center>
            </form>
          </div>
        </div>
        <Link to='/register'>
          <a>Create account</a>
        </Link>
      </center>
    </main>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, actionCreators)(Login);
