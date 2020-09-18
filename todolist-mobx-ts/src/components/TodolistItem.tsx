import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';

import { Todo } from '../store/TodoStore';

interface Props {
  todo: Todo;
  onDeleteTodo: (id: string) => void;
  onCompleteChange: (id: string) => void;
}

const TodolistItem = ({ todo, onDeleteTodo, onCompleteChange }: Props) => {
  const { id, title, completed } = todo;
  return (
    <li className={classNames('item', { archived: completed })}>
      <input
        id={id}
        type='checkbox'
        className='todo-checkbox'
        defaultChecked={completed}
      />
      <label htmlFor={id} onClick={() => onCompleteChange(id!)}></label>
      <span className='todo-text'>{title}</span>
      <span className='delete' onClick={() => onDeleteTodo(id!)} />
    </li>
  );
};

TodolistItem.propTypes = {
  todo: PropTypes.object.isRequired,
  onDeleteTodo: PropTypes.func.isRequired,
  onCompleteChange: PropTypes.func.isRequired,
};

export default observer(TodolistItem);
