export enum TodoActionKind {
  ADD_TODO_ITEM = 'ADD_TODO_ITEM',
  UPDATE_TODO_ITEM = 'UPDATE_TODO_ITEM',
  REMOVE_TODO_ITEM = 'REMOVE_TODO_ITEM'
}

export interface ITodo {
  id: number;
  title: string;
  status: boolean;
  description: string;
}

export interface TodoState {
  todolist: ITodo[];
}

export interface TodoActionType {
  type: TodoActionKind;
  payload: number | ITodo;
}

export interface ITodoContext {
  todolist: ITodo[];
  addTodoItem: (title: string, description: string) => void;
  updateTodoItem: (id: number) => void;
  removeTodoItem: (id: number) => void;
}