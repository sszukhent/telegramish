import { combineReducers } from 'redux';
import auth from './auth';
import conversations from './conversations';
import chat from './chat';

export default combineReducers({
  auth,
  conversations,
  chat
});
