import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

function TodoFooter({ remainingCount, hasCompleted, onClearCompletedClick }) {

  let onClearCompletedButton;

  if (hasCompleted) {
    onClearCompletedButton = (
      <button
        className="clear-completed"
        onClick={onClearCompletedClick}
      >
        Clear Completed
      </button>
    )
  }

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{remainingCount} </strong>
        item{remainingCount > 1 ? 's' : ''} left
      </span>
      <ul className="filters">
        <li><NavLink to="/" exact activeClassName="seleted">All</NavLink></li>
        <li><NavLink to="/active" activeClassName="seleted">Active</NavLink></li>
        <li><NavLink to="/completed" activeClassName="selected">Completed</NavLink></li>
      </ul>
      {onClearCompletedButton}
    </footer>
  )
}

TodoFooter.propTypes = {
  remainingCount: PropTypes.number,
  hasCompleted: PropTypes.bool,
  onClearCompletedClick: PropTypes.func,
}

export default TodoFooter

