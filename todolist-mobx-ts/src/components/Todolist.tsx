import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';

import TodoStore from '../store/TodoStore';
import TodolistItem from './TodolistItem';

const Todolist = () => {
  const todoStore = useContext(TodoStore);
  const { todos, toggleTodo, removeTodo } = todoStore;
  return (
    <ul className='todo-list'>
      {todos.map((todo) => (
        <TodolistItem
          key={todo.id}
          todo={todo}
          onDeleteTodo={removeTodo}
          onCompleteChange={toggleTodo}
        />
      ))}
    </ul>
  );
};

export default observer(Todolist);
