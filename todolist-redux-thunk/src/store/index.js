import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
);

/**
 * store 是唯一的
 * 只有store能改变自己的内容
 * createStore
 * getState()
 * dispatch(action)
 * subscribe(listener)
 * replaceReducer(nextReducer)
 */
const store = createStore(
  reducer,
  enhancer
);

export default store;
