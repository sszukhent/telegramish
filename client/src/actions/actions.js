import axios from 'axios';
import io from 'socket.io-client';
import setAuthToken from '../utils/setAuthToken';
import {
  SET_MESSAGES,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  SET_ROOM_ID,
  SET_ROOM_NAME,
  SET_NAME,
  LOAD_CONVERSATION,
  SELECT_CONVERSATION,
  DESELECT_CONVERSATION,
  CONVERSATION_ERROR,
  ENDPOINT,
  LOGOUT,
  GET_USERS_LIST,
  AUTH_STATE_LOADED,
  CONVO_STATE_LOADED,
  NEW_CONVO,
} from './constants';

// Set Room
export const setRoom = (id, members) => (dispatch) => {
  const memberNames = members.map((member) => member.name.split(' ')[0]);

  dispatch({
    type: SET_ROOM_ID,
    payload: id,
  });
  dispatch({
    type: SET_ROOM_NAME,
    payload: memberNames,
  });
};

// Set Name
export const setName = (name) => (dispatch) => {
  dispatch({
    type: SET_NAME,
    payload: name,
  });
};

// Create new conversation
export const newConvo = (members) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(
      `${ENDPOINT}/api/conversations`,
      members,
      config
    );

    dispatch({
      type: NEW_CONVO,
    });
    dispatch(loadConvo());
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err,
    });
  }
};

// Load Conversation
export const loadConvo = () => async (dispatch) => {
  try {
    const res = await axios.get(`${ENDPOINT}/api/conversations`);

    dispatch({
      type: LOAD_CONVERSATION,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Select conversation
export const selectConvo = (convo_id, name) => async (dispatch, state) => {
  try {
    // Change Conversation:
    // Check if the user clicked on a new conversation. If so, deselect any other conversations and then select the new conversation.
    if (
      state().conversations.currentConversations.find(
        (x) => x.selected === true
      ) &&
      state().conversations.currentConversations.find(
        (x) => x.selected === true
      ) !==
        state().conversations.currentConversations.find(
          (x) => x._id === convo_id
        )
    ) {
      dispatch({
        type: DESELECT_CONVERSATION,
      });
      dispatch({
        type: SELECT_CONVERSATION,
        payload: convo_id,
      });
    }
    // The user is deselecting the currently selected conversation.
    else if (
      state().conversations.currentConversations.find((x) => x._id === convo_id)
        .selected === true
    ) {
      return;
    }
    // There are no other selected conversations. The user is selecting a new conversation.
    else {
      dispatch({
        type: SELECT_CONVERSATION,
        payload: convo_id,
      });
    }
  } catch (err) {
    dispatch({
      type: CONVERSATION_ERROR,
      payload: err,
    });
  }
};

// Load Users List
export const loadUsersList = () => async (dispatch) => {
  try {
    const res = await axios.get(`${ENDPOINT}/api/auth/all`);

    dispatch({
      type: GET_USERS_LIST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err,
    });
  }
};

// State loaded
export const authStateLoaded = () => (dispatch) => {
  dispatch({
    type: AUTH_STATE_LOADED,
  });
};

export const convoStateLoaded = () => (dispatch) => {
  dispatch({
    type: CONVO_STATE_LOADED,
  });
};

// Set current message to messages array
export const setMessages = (message) => (dispatch, state) => {
  dispatch({
    type: SET_MESSAGES,
    payload: { roomId: state().chat.roomId, message },
  });
};

// Register User
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post(`${ENDPOINT}/api/users`, body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(`${ENDPOINT}/api/auth`);

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(`${ENDPOINT}/api/auth`, body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

// Sockets actions - Handled by middleware
export const joinRoom = (user, roomId) => {
  return {
    event: 'join',
    emit: true,
    payload: {
      user,
      roomId,
    },
  };
};

export const sendMessage = ({ roomId, name, message }) => {
  return {
    event: 'messageToServer',
    emit: true,
    payload: {
      roomId,
      name,
      message,
    },
  };
};

export const sendTyping = ({ startTyping, roomId, currentUser }) => {
  return {
    event: 'clientIsTyping',
    emit: true,
    payload: {
      startTyping,
      roomId,
      currentUser,
    },
  };
};
