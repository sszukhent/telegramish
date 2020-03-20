import { combineReducers } from 'redux';
import auth from './auth';
import conversations from './conversations';

export default combineReducers({
  auth,
  conversations
});
