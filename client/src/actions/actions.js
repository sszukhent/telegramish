import { SET_MESSAGES } from './constants';

export const setMessages = message => dispatch => {
  dispatch({
    type: SET_MESSAGES,
    payload: message
  });
};
