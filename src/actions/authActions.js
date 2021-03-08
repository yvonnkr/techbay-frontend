import { LOGGED_IN_USER } from "./types";

export const currentUser = (user, idTokenResult) => (dispatch) => {
  dispatch({
    type: LOGGED_IN_USER,
    payload: {
      email: user.email,
      token: idTokenResult.token,
    },
  });
};
