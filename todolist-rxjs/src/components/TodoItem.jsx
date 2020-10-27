import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

function TodoItem({
  onUpdate,
  onRemoveClick,
  onToggleClick,
  todo: { id, title, completed }
}) {

  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);

  const handleChange = (event) => {
    console.info('TodoItem handleChange...')
    setEditTitle(event.target.value);
  }

  const handleEdit = () => {
    setEditing(true)
  }

  const handleStop = () => {
    setEditing(false)
  }

  const handleSubmit = () => {
    if (editTitle.trim().length) {
      onUpdate(id, editTitle)
    } else {
      onRemoveClick(id)
    }
  }

  const handleKeyDown = ({ keyCode }) => {
    if (keyCode === ESCAPE_KEY) {
      handleStop();
    } else if (keyCode === ENTER_KEY) {
      handleStop();
    }
  }

  const liClass = classnames({
    completed: completed,
    editing: editing,
  })

  return (
    <li className={liClass}>
      <div className="view">
        <input
          id={`input-${id}`}
          type="checkbox"
          className="toggle"
          defaultChecked={completed}
          onClick={() => onToggleClick(id)}
        />
        <label htmlFor={`input-${id}`} onDoubleClick={handleEdit}>{title}</label>
        <button className="destory" onClick={() => onRemoveClick(id)}></button>
      </div>
      <input
        type="text"
        className="edit"
        value={editTitle}
        onChange={handleChange}
        onBlur={handleSubmit}
        onKeyDown={handleKeyDown}
      />
    </li>
  )
}

TodoItem.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  onToggleClick: PropTypes.func.isRequired,
  todo: PropTypes.object,
}

export default TodoItem

