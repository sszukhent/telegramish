import {
  SET_ROOM_ID,
  SET_ROOM_NAME,
  SET_NAME,
  LOGOUT,
} from '../actions/constants';

const initialState = {
  roomId: '',
  roomNames: 'Nothing Yet',
  name: '',
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ROOM_ID:
      return {
        ...state,
        roomId: payload,
      };
    case SET_ROOM_NAME:
      return {
        ...state,
        roomNames: payload,
      };
    case SET_NAME:
      return {
        ...state,
        name: payload,
      };
    case LOGOUT:
      return {
        ...state,
        roomId: '',
        roomNames: 'Nothing Yet',
        name: '',
      };
    default:
      return state;
  }
}
