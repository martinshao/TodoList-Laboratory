export function addTodo(text: string) {
  return {
    type: 'ADD_TODO',
    text
  }
}

export function removeTodo(id: string) {
  return {
    type: 'REMOVE_TODO',
    id
  }
}