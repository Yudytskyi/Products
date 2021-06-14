import AUTH_ACTION_TYPES from './authActionTypes';

export const loginRequest = values => ({
  type: AUTH_ACTION_TYPES.LOGIN_REQUEST,
  payload: {
    values,
  },
});

export const signupRequest = values => ({
  type: AUTH_ACTION_TYPES.SIGNUP_REQUEST,
  payload: {
    values,
  },
});

export const refreshRequest = values => ({
  type: AUTH_ACTION_TYPES.REFRESH_REQUEST,
  payload: {
    values,
  },
});

export const authRequestSuccess = values => ({
  type: AUTH_ACTION_TYPES.AUTH_REQUEST_SUCCESS,
  payload: {
    values,
  },
});

export const authRequestFail = error => ({
  type: AUTH_ACTION_TYPES.AUTH_REQUEST_FAIL,
  payload: {
    error,
  },
});
