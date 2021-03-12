import { LOGGED_IN_USER, LOGGED_IN_ADMIN, LOGOUT } from "../actions/types";

const initialState = null;

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGGED_IN_USER:
      return action.payload;
    case LOGGED_IN_ADMIN:
      return action.payload;
    case LOGOUT:
      return action.payload;
    default:
      return state;
  }
};
