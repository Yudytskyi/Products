import { combineReducers } from 'redux';
import { reducer as formReducers } from 'redux-form';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducers,
});

export default rootReducer;

