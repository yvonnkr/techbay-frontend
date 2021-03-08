import { LOGGED_IN_USER, LOGOUT } from "./types";

export const createOrUpdateUser = (user, idTokenResult) => async (dispatch) => {
  //TODO: trycatch ajax/api call
  dispatch({
    type: LOGGED_IN_USER,
    payload: {
      email: user.email,
      token: idTokenResult.token,
    },
  });
};

export const currentUser = (user, idTokenResult) => (dispatch) => {
  dispatch({
    type: LOGGED_IN_USER,
    payload: {
      email: user.email,
      token: idTokenResult.token,
    },
  });
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
    payload: null,
  });
};
