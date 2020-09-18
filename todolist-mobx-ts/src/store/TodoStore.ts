import { action, computed, observable, reaction } from 'mobx'
import { v4 as uuidv4 } from 'uuid'
import { createContext } from 'react'

export interface Todo {
  id?: string;
  title: string;
  completed: boolean;
}

class TodoStore {

  constructor() {
    reaction(
      () => this.todos,
      _ => console.info(this.todos.length)
    )
  }

  @observable
  todos: Todo[] = [
    { id: uuidv4(), title: "Item #1", completed: false },
    { id: uuidv4(), title: "Item #2", completed: false },
    { id: uuidv4(), title: "Item #3", completed: false },
    { id: uuidv4(), title: "Item #4", completed: false },
    { id: uuidv4(), title: "Item #5", completed: true },
    { id: uuidv4(), title: "Item #6", completed: false },
  ]

  @action
  addTodo = (todo: Todo) => {
    this.todos.push({ ...todo, id: uuidv4() })
  }

  @action
  removeTodo = (id: string) => {
    this.todos = this.todos.filter(todo => todo.id !== id)
  }

  @action
  toggleTodo = (id: string) => {
    this.todos = this.todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed
        };
      }
      return todo
    })
  }

  @computed
  get info() {
    return {
      total: this.todos.length,
      completed: this.todos.filter(todo => todo.completed).length,
      notCompleted: this.todos.filter(todo => !todo.completed).length
    }
  }
}

export default createContext(new TodoStore())
