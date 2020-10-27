import React, { useEffect, useState, useMemo } from 'react'
import todoService from '../services/todoServece'

import TodoList from './TodoList'
import TodoHeader from './TodoHeader'
import TodoFooter from './TodoFooter'

function Todos(props) {

  const [todos, setTodos] = useState([])

  useEffect(() => {
    const todos$ = todoService.todos$.subscribe(todos => setTodos(todos));
    return () => {
      todos$.unsubscribe();
    }
  }, [todos])

  const getVisibleTodos = useMemo(() => {
    const { filter } = props.match.params;

    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, props.match.params])

  const handleAdd = (title) => {
    todoService.add(title)
  }

  const handleRemove = (uuid) => {
    todoService.remove(uuid);
  }

  const handleRemoveCompleted = () => {
    todoService.removeCompleted();
  }

  const handleToggle = (uuid) => {
    console.info('handleToggle...', uuid)
    todoService.toggle(uuid)
  }

  const handleToggleAll = (event) => {
    todoService.toggleAll(event.target.checked)
  }

  const handleUpdate = (uuid, newTitle) => {
    todoService.update(uuid, newTitle);
  }

  let todoList, todoFooter;

  if (todos.length) {
    const remainingCount = todos.filter(todo => !todo.completed).length;
    const hasCompleted = todos.length > remainingCount;

    todoList = (
      <TodoList
        todos={getVisibleTodos}
        onRemoveClick={handleRemove}
        onToggleClick={handleToggle}
        onToggleAllClick={handleToggleAll}
        onUpdate={handleUpdate}
      />
    );

    todoFooter = (
      <TodoFooter
        remainingCount={remainingCount}
        hasCompleted={hasCompleted}
        onClearCompletedClick={handleRemoveCompleted}
      />
    )
  }
  
  return (
    <section className="todoapp">
      <TodoHeader onKeyDown={handleAdd} />
      {todoList}
      {todoFooter}
    </section>
  )
}

export default Todos