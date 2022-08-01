import { Reducer, useReducer } from 'react'

import { ITodo, TodoActionKind, TodoActionType, ITodoContext, TodoState } from '../@types/todo.d'

const initialState: TodoState = {
  todolist: []
}

const todoReducer: Reducer<TodoState, TodoActionType> = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case TodoActionKind.ADD_TODO_ITEM:
      return {
        todolist: [
          ...state.todolist,
          payload as ITodo
        ]
      }
    case TodoActionKind.UPDATE_TODO_ITEM: {
      const filteredTodoItem: ITodo[] = state.todolist.filter(
        todoItem => todoItem.id !== payload
      )
      return { todolist: filteredTodoItem }
    };
    case TodoActionKind.REMOVE_TODO_ITEM: {
      const updatedTodoList: ITodo[] = state.todolist.map(
        todoItem => todoItem.id === payload ? { ...todoItem, status: !todoItem.status } :
          todoItem
      )
      return { todolist: updatedTodoList }
    }
    default:
      return state
  }
}



const useTodoStore = (): ITodoContext => {
  const [state, dispatch] = useReducer(todoReducer, initialState)

  const todoContextValue: ITodoContext = {
    todolist: state.todolist,
    addTodoItem: (title: string, description: string) => {
      const newTodo: ITodo = { id: new Date().valueOf(), title, status: false, description }
      dispatch({ type: TodoActionKind.ADD_TODO_ITEM, payload: newTodo })
    },
    updateTodoItem: (id: number) => {
      dispatch({ type: TodoActionKind.UPDATE_TODO_ITEM, payload: id })
    },
    removeTodoItem: (id: number) => {
      dispatch({ type: TodoActionKind.REMOVE_TODO_ITEM, payload: id })
    }
  }

  return todoContextValue
}

export default useTodoStore