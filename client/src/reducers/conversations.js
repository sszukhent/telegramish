import {
  LOAD_CONVERSATION,
  CONVERSATION_ERROR,
  CONVO_STATE_LOADED,
  SELECT_CONVERSATION,
  DESELECT_CONVERSATION,
  SET_MESSAGES,
  TYPING,
  STOPPED_TYPING,
  LOGOUT,
  NEW_CONVO,
} from '../actions/constants';

const initialState = {
  currentConversations: [],
  convoStateLoading: false,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    // case GET_PROFILE:
    //   return {
    //     ...state,
    //     profile: payload,
    //     loading: true
    //   };
    case SET_MESSAGES:
      return {
        ...state,
        messages: state.currentConversations
          .find((x) => x._id === payload.roomId)
          .messages.push(payload.messageFormatted),
      };
    case NEW_CONVO:
      return {
        ...state,
        convoStateLoading: false,
      };

    case LOAD_CONVERSATION:
      // const { members, messages } = payload[0];
      return {
        ...state,
        currentConversations: payload,
        convoStateLoading: true,
      };
    case CONVO_STATE_LOADED:
      return {
        ...state,
        convoStateLoading: false,
      };
    case SELECT_CONVERSATION:
      return {
        ...state,
        selected: (state.currentConversations.find(
          (x) => x._id === payload
        ).selected = true),
      };
    case DESELECT_CONVERSATION:
      return {
        ...state,
        selected: (state.currentConversations.find(
          (x) => x.selected === true
        ).selected = false),
      };
    case TYPING:
      return {
        ...state,
        typing: (state.currentConversations.find(
          (x) => x._id === payload.roomId
        ).typing = true),

        userTyping: (state.currentConversations.find(
          (x) => x._id === payload.roomId
        ).userTyping = payload.currentUser.name),
      };
    case STOPPED_TYPING:
      return {
        ...state,
        typing: (state.currentConversations.find(
          (x) => x._id === payload.roomId
        ).typing = false),

        userTyping: (state.currentConversations.find(
          (x) => x._id === payload.roomId
        ).userTyping = ''),
      };
    case CONVERSATION_ERROR:
      return {
        ...state,
        error: payload,
        convoStateLoading: false,
      };
    case LOGOUT:
      return {
        ...state,
        currentConversations: [],
        convoStateLoading: false,
        error: {},
      };

    default:
      return state;
  }
}
