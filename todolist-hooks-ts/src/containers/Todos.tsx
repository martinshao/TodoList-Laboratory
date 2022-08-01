import React from 'react'
import { ITodo } from '../@types/todo'
import { useTodoContext } from '../contexts/todoProvider'
import Todo from '../components/Todo'

const Todos = () => {

  const { todolist, updateTodoItem } = useTodoContext()

  return (
    <>
      {
        todolist.map((todo: ITodo) => (
          <Todo key={todo.id} todo={todo} updateTodo={updateTodoItem} />
        ))
      }
    </>
  )
}

export default Todos