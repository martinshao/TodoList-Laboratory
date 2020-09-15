import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TodoItem from './TodoItem'

class TodoList extends Component {

  static propTypes = {
    list: PropTypes.array.isRequired,
    handleItemDel: PropTypes.func.isRequired,
  }

  render() {
    return (
      <ul>
        { this.getTodoItem()}
      </ul>
    )
  }

  getTodoItem() {
    return this.props.list.map((item, index) => {
      return (
        <TodoItem
          key={index}
          content={item}
          index={index}
          deleteItem={this.props.handleItemDel}
        />
      )
    })
  }
}

export default TodoList;
