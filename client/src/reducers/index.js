import { combineReducers } from 'redux';
import messageReducer from './messageReducer';
import auth from './auth';

export default combineReducers({
  auth,
  messageReducer
});
