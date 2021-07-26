import produce from 'immer';
import AUTH_ACTION_TYPES from '../actions/authActions/authActionTypes';
import createReducer from '../services/createReducer';

const initialState = {
  user: null,
  isFetching: false,
  error: null,
};

const handlers = {
  [AUTH_ACTION_TYPES.AUTH_REQUEST]: produce((draftState) => {
    draftState.isFetching = true;
  }),
  [AUTH_ACTION_TYPES.AUTH_REQUEST_SUCCESS]: produce((draftState, action) => {
    const {
      payload: {
        data: { user },
      },
    } = action;
    console.log('AUTH_REQUEST_SUCCESS');
    draftState.isFetching = false;
    draftState.user = [user];
  }),
  [AUTH_ACTION_TYPES.AUTH_REQUEST_FAIL]: produce((draftState, action) => {
    const {
      payload: { error },
    } = action;
    console.dir(action);
    draftState.isFetching = false;
    draftState.error = error;
  }),
};

const authReducer = createReducer(initialState, handlers);

export default authReducer;
