import React, { Component } from 'react';
import './index.css';
import 'antd/dist/antd.css';
import store from './store';
import TodoListUI from './TodoListUI';
import {
  getInputChangeAction,
  getDeleteItemAction,
  getAddItemAction,
  getTodoList } from './store/actionCreators';

class App extends Component {

  constructor(props){
    super(props);
    this.state = store.getState();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleStoreChange = this.handleStoreChange.bind(this);
    this.handleItemDelete = this.handleItemDelete.bind(this);
    this.handleBtnClick = this.handleBtnClick.bind(this);
    store.subscribe(this.handleStoreChange);
  }

  render() {
    return (
      <TodoListUI
        list={this.state.list}
        inputValue={this.state.inputValue}
        handleBtnClick={this.handleBtnClick}
        handleItemDelete={this.handleItemDelete}
        handleInputChange={this.handleInputChange}/>
    )
  }

  componentDidMount() {
    const action = getTodoList();
    store.dispatch(action);
  }

  handleInputChange(e) {
    const action = getInputChangeAction(e);
    store.dispatch(action);
  }

  handleStoreChange() {
    console.info('store change');
    this.setState(store.getState());
  }

  handleBtnClick() {
    const action = getAddItemAction();
    store.dispatch(action);
  }
  
  /**
   * @description
   * 删除
   *
   * @param {*} index
   * @memberof App
   * @author shaogucheng
   * @example 
   */
  handleItemDelete(index) {
    const action = getDeleteItemAction(index);
    store.dispatch(action);
  }
}

export default App;
