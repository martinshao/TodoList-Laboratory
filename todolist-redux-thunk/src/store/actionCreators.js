import axios from 'axios';

import {
  ADD_TODO_ITEM,
  DELETE_TODO_ITEM,
  INIT_LIST_ACTION,
  CHANGE_INPUT_VALUE
} from './actionTypes'

const getInputChangeAction = (value) => ({
  type: CHANGE_INPUT_VALUE,
  value
});

const getAddItemAction = () => ({
  type: ADD_TODO_ITEM
});

const getDeleteItemAction = (index) => ({
  type: DELETE_TODO_ITEM,
  index
});

const initListAction = (data) => ({
  type: INIT_LIST_ACTION,
  data
})

const getTodoList = () => {
  return (dispatch, getState) => {
    console.info(getState())
    // Yay! Can invoke sync or async actions with `dispatch`
    axios.get('/list.json')
      .then(res => {
        const data = res.data.data;
        const action = initListAction(data);
        dispatch(action);
      })
      .catch(error => console.warn(error));
  }
}

export {
  getInputChangeAction,
  getDeleteItemAction,
  getAddItemAction,
  initListAction,
  getTodoList
}