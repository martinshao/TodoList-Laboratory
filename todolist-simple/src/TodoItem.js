import React, { Component } from 'react'

class TodoItem extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    // 这是解构赋值的写法
    const { content } = this.props;
    return (
      <li onClick={this.handleClick}>
        {content}
      </li>
    )
  }

  handleClick = () => {
    const { deleteItem, index } = this.props;
    deleteItem(index);
  }

}

export default TodoItem;
