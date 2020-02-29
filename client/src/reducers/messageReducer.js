import { SET_MESSAGES } from '../actions/constants';

const initialState = {
  messages: []
};

export default function(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case SET_MESSAGES:
      return { ...state, messages: action.payload };
    default:
      return state;
  }
}
