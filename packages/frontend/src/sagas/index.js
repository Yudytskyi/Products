import { takeLatest } from 'redux-saga/effects';
import * as authSagas from './authSagas';
import AUTH_ACTION_TYPES from '../redux/actions/authActions/authActionTypes';

function* rootSaga() {
  yield takeLatest(AUTH_ACTION_TYPES.LOGIN_REQUEST, authSagas.loginSaga);
  yield takeLatest(AUTH_ACTION_TYPES.LOGIN_REQUEST, authSagas.signupSaga);
  yield takeLatest(AUTH_ACTION_TYPES.LOGIN_REQUEST, authSagas.refreshSaga);
}

export default rootSaga;
