import {
  // GET_PROFILE,
  LOAD_CONVERSATION,
  PROFILE_ERROR,
  // CLEAR_PROFILE,
  // USERS_LIST,
  SET_ROOM,
  SET_NAME,
  CONVO_STATE_LOADED,
  LOGOUT
} from '../actions/constants';

const initialState = {
  members: [],
  messages: [],
  room: '',
  name: '',
  convoStateLoading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    // case GET_PROFILE:
    //   return {
    //     ...state,
    //     profile: payload,
    //     loading: true
    //   };
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
        messages: messages,
        convoStateLoading: true
      };
    case CONVO_STATE_LOADED:
      return {
        ...state,
        convoStateLoading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        convoStateLoading: false
      };
    case LOGOUT:
      return {
        ...state,
        members: [],
        messages: [],
        room: '',
        name: '',
        convoStateLoading: false,
        error: {}
      };

    default:
      return state;
  }
}
