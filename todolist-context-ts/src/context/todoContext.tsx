import * as React from 'react'

import { TodoContextType, ITodo } from '../@types/todo'

interface Props {
  children: React.ReactNode;
}

export const TodoContext = React.createContext<TodoContextType | null>(null)

const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = React.useState<ITodo[]>([
    {
      id: 1,
      title: 'post 1',
      descripttion: 'this is a description',
      status: false
    },

    {
      id: 2,
      title: 'post 1',
      descripttion: 'this is a description',
      status: false
    }
  ])

  const saveTodo = (todo: ITodo) => {
    const newTodo: ITodo = {
      id: new Date().valueOf(),
      title: todo.title,
      descripttion: todo.descripttion,
      status: false,
    }
    setTodos([...todos, newTodo])
  }

  const updateTodo = (id: number) => {
    const newTodos = todos.map((todo: ITodo) => {
      if (todo.id === id) return { ...todo, status: !todo.status }
      return todo
    })
    setTodos(newTodos)
  }

  return (
    <TodoContext.Provider value={{ todos, saveTodo, updateTodo }}>
      {children}
    </TodoContext.Provider>
  )
}

export default TodoProvider