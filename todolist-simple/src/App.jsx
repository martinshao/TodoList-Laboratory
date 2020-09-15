import React, { Component, Fragment } from 'react';
import "./App.css";
import TodoList from "./components/TodoList";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      list: []
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBtnClick = this.handleBtnClick.bind(this);
    this.handleItemDel = this.handleItemDel.bind(this);
  }

  render() {
    return (
      <Fragment>
        {/**这是组件的render函数 */}
        <label htmlFor="insertArea">输入内容</label>
        <input
          id='insertArea'
          className='input'
          value={this.state.inputValue}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleBtnClick}>提交</button>
        <TodoList list={this.state.list} handleItemDel={this.handleItemDel} />
      </Fragment>
    )
  }

  handleInputChange(e) {
    // 这种是旧式写法
    // this.setState({
    //   inputValue: e.target.value
    // })
    // 这种是react-v6推荐的写法
    const value = e.target.value;
    this.setState(
      () => ({
        inputValue: value
      })
    )
  }

  handleBtnClick() {
    // react 不允许我们对 state 做任何改变
    // react 改变数据必须调用setState(function)
    // immutable
    // 这样做有利于后期 性能优化
    this.setState((preState) => ({
      list: [...preState.list, preState.inputValue],
      inputValue: ''
    }))
  }

  handleItemDel(index) {
    this.setState((preState) => {
      const list = [...preState.list];
      list.splice(index, 1);
      return { list }
    })
  }
}

export default App;
