import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TodoItem extends Component {

  static propTypes = {
    content: PropTypes.string.isRequired,
    deleteItem: PropTypes.func.isRequired,
  }

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
