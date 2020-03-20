import {
  GET_PROFILE,
  LOAD_CONVERSATION,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  USERS_LIST,
  SET_ROOM,
  SET_NAME
} from '../actions/constants';

const initialState = {
  members: [],
  messages: [],
  room: '',
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case SET_ROOM:
      return { ...state, room: payload };
    case SET_NAME:
      return { ...state, name: payload };
    // case SET_MESSAGES:
    //   return { ...state, messages: payload };
    case LOAD_CONVERSATION:
      const { members, messages } = payload[0];
      return {
        ...state,
        members: members,
        messages: messages
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        messages: [],
        loading: false
      };

    default:
      return state;
  }
}
