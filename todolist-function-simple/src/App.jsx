import React, { useCallback, useState } from 'react';
import './App.css';
import Header from './components/Header'
import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'

function App() {

  const [todos, setTodos] = useState([])

  const onSubmit = useCallback(
    (todo) => {
      const newTodos = [...todos, todo]
      setTodos(newTodos)
    },
    [todos],
  )

  const onCompleteChange = useCallback(
    (id) => {
      const newTodos = todos.map(item => {
        if (item.id === id) {
          return {
            ...item,
            completed: !item.completed
          }
        }
        return item
      })
      setTodos(newTodos)
    },
    [todos],
  )

  const onDeleteTodo = useCallback(
    (id) => {
      const newTodos = todos.filter(item => item.id !==id)
      setTodos(newTodos)
    },
    [todos],
  )

  return (
    <div className="todo-list-app">
      <Header />
      <AddTodo onSubmit={onSubmit} />
      <TodoList
        todos={todos}
        onDeleteTodo={onDeleteTodo}
        onCompleteChange={onCompleteChange}
      />
    </div>
  );
}

export default App;
