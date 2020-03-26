import {
  LOAD_CONVERSATION,
  PROFILE_ERROR,
  SET_ROOM,
  SET_NAME,
  CONVO_STATE_LOADED,
  ENTER_CONVERSATION,
  LOGOUT
} from '../actions/constants';

const initialState = {
  currentConversations: [],
  // messages: [],
  // room: '',
  // name: '',
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
      // const { members, messages } = payload[0];
      return {
        ...state,
        currentConversations: payload,
        convoStateLoading: true
      };
    case CONVO_STATE_LOADED:
      return {
        ...state,
        convoStateLoading: false
      };
    case ENTER_CONVERSATION:
      // console.log(
      //   state.currentConversations.find(x => x._id === payload).selected
      // );
      return {
        ...state,
        selected: (state.currentConversations.find(
          x => x._id === payload
        ).selected = true)
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
        currentConversations: [],
        // messages: [],
        // room: '',
        // name: '',
        convoStateLoading: false,
        error: {}
      };

    default:
      return state;
  }
}
