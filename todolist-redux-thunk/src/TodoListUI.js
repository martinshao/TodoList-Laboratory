import React from 'react'
import { Input, Button, List } from 'antd';

const TodoListUI = (props) => {
  return (
    <div className="App">
      <Input
        placeholder="Basic usage"
        value={props.inputValue}
        style={{width: '30rem', marginRight: '2rem'}}
        onChange={props.handleInputChange}/>
      <Button
        type="primary"
        style={{width: '80px'}}
        onClick={props.handleBtnClick}
        >提交</Button>
      <div className='table'>
        <List
          bordered
          dataSource={props.list}
          renderItem={
            (item, index) => (
              <List.Item onClick={() => {props.handleItemDelete(index)}}>{item}</List.Item>
            )
          }
        />
      </div>
    </div>
  )
}

/**
export default class TodoListUI extends Component {
  render() {
    return (
      <div className="App">
        <Input
          placeholder="Basic usage"
          value={this.props.inputValue}
          style={{width: '30rem', marginRight: '2rem'}}
          onChange={this.props.handleInputChange}/>
        <Button
          type="primary"
          style={{width: '80px'}}
          onClick={this.props.handleBtnClick}
          >提交</Button>
        <div className='table'>
          <List
            bordered
            dataSource={this.props.list}
            renderItem={
              (item, index) => (
                <List.Item onClick={(index) => {this.props.handleItemDelete(index)}}>{item}</List.Item>
              )
            }
          />
        </div>
      </div>
    )
  }
}
 */


export default TodoListUI;