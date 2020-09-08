import { createStore } from 'redux';
import reducer from './reducer'

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
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
