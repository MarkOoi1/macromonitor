import axios from "axios";
import { returnErrors } from "./errorActions";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  ENABLE_WELCOME,
} from "./types";

// Check token and load user
export const loadUser = () => async (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .then((res) => {
      if (res.payload.welcomemsg) {
        dispatch({
          type: ENABLE_WELCOME,
        });
      }
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: AUTH_ERROR });
    });
};

// Register User
export const register = (success, payload) => (dispatch) => {
  if (success) {
    dispatch({
      type: REGISTER_SUCCESS,
      payload: payload.data.register,
    });
    dispatch({
      type: ENABLE_WELCOME,
    });
  } else {
    dispatch(returnErrors(payload, 401, "REGISTER_FAIL"));
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login User
export const login = (success, payload) => (dispatch) => {
  if (success) {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: payload.data.login,
    });
  } else {
    dispatch(returnErrors(payload, 401, "LOGIN_FAIL"));
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

// Setup config/headers and state
export const tokenConfig = (getState) => {
  // Get token from localStorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
