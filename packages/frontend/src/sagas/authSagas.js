import { put } from 'redux-saga/effects';
import * as authActionCreators from '../redux/actions/authActions/authActionCreators';
import * as Api from '../api/rest';

const createAuthSaga = apiMethod =>
  function* authSaga(action) {
    yield put(authActionCreators.authRequest());
    try {
      const {
        payload: { values },
      } = action;

      const {
        data: { data },
      } = yield apiMethod(values);

      yield put(authActionCreators.authRequestSuccess([data]));
    } catch (error) {
      yield put(authActionCreators.authRequestFail(error));
    }
  };

export const loginSaga = createAuthSaga(Api.auth.login);
export const signupSaga = createAuthSaga(Api.auth.signup);
export const refreshSaga = createAuthSaga(Api.auth.refresh);
