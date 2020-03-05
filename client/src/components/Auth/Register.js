import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actionCreators from '../../actions/actions';
import './Auth.css';

const Register = ({ register }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { name, email, password, confirmPassword } = formData;

  const inputToState = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const submitForm = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log('Passwords do not match.');
    } else {
      register({ name, email, password });
    }
  };

  return (
    <main>
      <center>
        <div className='section'></div>

        <h5 id='login-title'>
          <i className='fas fa-bolt'></i> Get Amp'd
        </h5>
        <div className='section'></div>

        <div className='container'>
          <div
            className='z-depth-1 grey lighten-4 row'
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
                    placeholder='Name'
                    name='name'
                    id='name'
                    value={name}
                    onChange={e => inputToState(e)}
                  />
                </div>
              </div>

              <div className='row'>
                <div className='input-field col s12'>
                  <input
                    placeholder='Email'
                    type='email'
                    name='email'
                    id='email'
                    value={email}
                    onChange={e => inputToState(e)}
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
                    value={password}
                    onChange={e => inputToState(e)}
                  />
                </div>
              </div>
              <div className='row mb0' style={{ paddingBottom: 'none' }}>
                <div className='input-field col s12'>
                  <input
                    className='validate'
                    placeholder='Confirm Password'
                    type='password'
                    name='confirmPassword'
                    id='confirmPassword'
                    value={confirmPassword}
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
                    Register
                  </button>
                </div>
              </center>
            </form>
          </div>
        </div>
      </center>
    </main>
  );
};

export default connect(null, actionCreators)(Register);
