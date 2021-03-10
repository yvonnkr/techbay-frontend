import axios from "axios";
import { LOGGED_IN_USER, LOGOUT } from "./types";

const API = process.env.REACT_APP_API;

export const createOrUpdateUser = (idTokenResult) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${API}/create-or-update-user`,
      {},
      {
        headers: {
          authToken: idTokenResult.token,
        },
      }
    );

    const { name, email, role, _id } = data;

    dispatch({
      type: LOGGED_IN_USER,
      payload: {
        _id,
        name,
        email,
        role,
        token: idTokenResult.token,
      },
    });
  } catch (error) {
    console.log(error);
    //TODO: use helper method
  }
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
