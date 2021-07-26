import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../redux/reducers';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = composeWithDevTools({
  trace: true,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
