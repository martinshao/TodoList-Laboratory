import React, { createContext } from 'react'
import { ITodo, ITodoContext } from '../@types/todo'
import useTodoStore from './todoStore'

export const TodoContext = createContext<ITodoContext | null>(null)

interface TodoProviderProps {
  children: React.ReactNode
}

const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const value = useTodoStore()

  console.info('TodoProvider value', value)

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  )
}

export const useTodoContext = () => React.useContext<ITodoContext | null>(TodoContext) as ITodoContext

export const useTodos = (): ITodo[] => {
  const { todolist } = useTodoContext()
  return todolist
}

export default TodoProvider