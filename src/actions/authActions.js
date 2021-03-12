import axios from "axios";
import {
  CLEAR_ERRORS,
  GET_ERRORS,
  LOGGED_IN_USER,
  LOGGED_IN_ADMIN,
  LOGOUT,
} from "./types";
import { actionErrorsPayload } from "../helpers/actionErrors";

const API = process.env.REACT_APP_API;

export const createOrUpdateUser = (idTokenResult, history = null) => async (
  dispatch
) => {
  dispatch({ type: CLEAR_ERRORS });

  const token = idTokenResult.token;
  const config = { headers: { authToken: token } };

  try {
    const { data } = await axios.post(
      `${API}/create-or-update-user`,
      {},
      config
    );

    const { name, email, role, _id } = data;

    if (role === "admin") {
      dispatch(currentAdmin(token));
    } else {
      dispatch({
        type: LOGGED_IN_USER,
        payload: {
          _id,
          name,
          email,
          role,
          token,
          isAdmin: false,
        },
      });
    }
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: actionErrorsPayload(error),
    });
  }
};

export const currentUser = (idTokenResult) => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });

  const token = idTokenResult.token;
  const config = { headers: { authToken: token } };

  try {
    const { data } = await axios.get(`${API}/current-user`, config);

    const { name, email, role, _id } = data;

    if (role === "admin") {
      dispatch(currentAdmin(token));
    } else {
      dispatch({
        type: LOGGED_IN_USER,
        payload: {
          _id,
          name,
          email,
          role,
          token,
          isAdmin: false,
        },
      });
    }
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: actionErrorsPayload(error),
    });
  }
};

export const currentAdmin = (token) => async (dispatch) => {
  const config = { headers: { authToken: token } };

  try {
    const { data } = await axios.get(`${API}/current-admin`, config);
    const { name, email, role, _id } = data;

    dispatch({
      type: LOGGED_IN_ADMIN,
      payload: {
        _id,
        name,
        email,
        role,
        token,
        isAdmin: true,
      },
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: actionErrorsPayload(error),
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
    payload: null,
  });
};
