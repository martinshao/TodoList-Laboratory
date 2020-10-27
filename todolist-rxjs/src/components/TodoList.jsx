import React from 'react'
import PropTypes from 'prop-types'
import TodoItem from './TodoItem'

function TodoList({ todos, onToggleAllClick, ...restProps }) {
  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        onChange={onToggleAllClick}
      />
      <ul className="todo-list">
        {
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              {...restProps}
            />
          ))
        }
      </ul>
    </section>
  )
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  onToggleAllClick: PropTypes.func.isRequired,
}

export default TodoList

