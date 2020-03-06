import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  SET_MESSAGES
} from '../actions/constants';

const initialState = {
  profile: null,
  profiles: [],
  messages: [],
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
    case SET_MESSAGES:
      return { ...state, messages: payload };

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
