import React from 'react'
import PropTypes from 'prop-types'
import TodoListItem from './TodoListItem'

function TodoList({ todos = [], onDeleteTodo, onCompleteChange }) {
  return (
    <ul className="todo-list">
      {
        todos.map(item => (
          <TodoListItem
            key={item.id}
            todo={item}
            onDeleteTodo={onDeleteTodo}
            onCompleteChange={onCompleteChange}
          />
        ))
      }
    </ul>
  )
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
  onCompleteChange: PropTypes.func.isRequired,
}

export default TodoList
