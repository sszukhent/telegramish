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
  SET_ROOM,
  SET_NAME,
  LOAD_CONVERSATION,
  // PROFILE_ERROR,
  // CLEAR_PROFILE,
  ENDPOINT,
  LOGOUT,
  GET_USERS_LIST,
  STATE_LOADED
} from './constants';

// Set Room
export const setRoom = room => dispatch => {
  dispatch({
    type: SET_ROOM,
    payload: room
  });
};

// Set Name
export const setName = name => dispatch => {
  dispatch({
    type: SET_NAME,
    payload: name
  });
};

// Load Conversation
export const loadConvo = () => async dispatch => {
  try {
    const res = await axios.get(`${ENDPOINT}/api/conversations`);

    dispatch({
      type: LOAD_CONVERSATION,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Load Users List
export const loadUsersList = () => async dispatch => {
  try {
    const res = await axios.get(`${ENDPOINT}/api/auth/all`);

    dispatch({
      type: GET_USERS_LIST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err
    });
  }
};

// User list loaded, stop loading
export const stateLoaded = () => dispatch => {
  dispatch({
    type: STATE_LOADED
  });
};

// Set current message to messages array
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

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT
  });
};
