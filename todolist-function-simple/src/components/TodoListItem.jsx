import React from 'react'
import PropTypes from 'prop-types'

function TodoListItem({ todo, onDeleteTodo, onCompleteChange }) {
  const {
    id,
    text,
    completed,
  } = todo
  
  return (
    <li className={completed ? '' : 'archived'}>
      <input
        id={id}
        type="checkbox"
        className="todo-checkbox"
        defaultChecked={completed}
      />
      <label htmlFor={id} onClick={() => onCompleteChange(id)}></label>
      <span className="todo-text">{text}</span>
      <span className="delete" onClick={() => onDeleteTodo(id)} />
    </li>
  )
}

TodoListItem.propTypes = {
  todo: PropTypes.object.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
  onCompleteChange: PropTypes.func.isRequired,
}

export default TodoListItem

