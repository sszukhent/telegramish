import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {
  SET_MESSAGES,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  ENDPOINT,
  LOGOUT
} from './constants';

export const setMessages = message => dispatch => {
  dispatch({
    type: SET_MESSAGES,
    payload: message
  });
};

// Register User
export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post(`${ENDPOINT}/api/users`, body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(`${ENDPOINT}/api/auth`);

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Login User
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(`${ENDPOINT}/api/auth`, body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// // Create Profile
// export const createProfile = () => async dispatch => {

// }

// // Load Profile
// export const loadProfile = ({user, messages}) => async dispatch => {

// }

// Logout and clear profile

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT
  });
};
