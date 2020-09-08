import React, { Component } from 'react';
import './index.css';
import 'antd/dist/antd.css';
import { Input, Button, List } from 'antd';
import store from './store'
import {
  getInputChangeAction,
  getDeleteItemAction,
  getAddItemAction } from './store/actionCreators'

class App extends Component {

  constructor(props){
    super(props);
    this.state = store.getState();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleStoreChange = this.handleStoreChange.bind(this);
    this.handleBtnClick = this.handleBtnClick.bind(this);
    store.subscribe(this.handleStoreChange);
  }

  render() {
    return (
      <div className="App">
        <Input
          placeholder="Basic usage"
          value={this.state.inputValue}
          style={{width: '30rem', marginRight: '2rem'}}
          onChange={this.handleInputChange}/>
        <Button
          type="primary"
          style={{width: '80px'}}
          onClick={this.handleBtnClick}
          >提交</Button>
        <div className='table'>
          <List
            bordered
            dataSource={this.state.list}
            renderItem={
              (item, index) => (
                <List.Item onClick={this.handleItemDelete.bind(this, index)}>{item}</List.Item>
              )
            }
          />
        </div>
      </div>
    );
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
