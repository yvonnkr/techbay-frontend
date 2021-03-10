import axios from "axios";
import { CLEAR_ERRORS, GET_ERRORS, LOGGED_IN_USER, LOGOUT } from "./types";
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

    dispatch({
      type: LOGGED_IN_USER,
      payload: {
        _id,
        name,
        email,
        role,
        token,
      },
    });

    role === "admin"
      ? history.push("/admin/dashboard")
      : history.push("/user/history");
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

    dispatch({
      type: LOGGED_IN_USER,
      payload: {
        _id,
        name,
        email,
        role,
        token,
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
