import React from 'react'
import { ITodo, ITodoContext } from '../@types/todo'
import { TodoContext } from '../contexts/todoProvider'


const AddTodo: React.FC = () => {
  const { addTodoItem } = React.useContext<ITodoContext | null>(TodoContext) as ITodoContext

  const [formData, setFormData] = React.useState<Partial<ITodo> | null>(null)

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value
    })
  }

  const handleSaveTodo = (e: React.FormEvent<HTMLFormElement>, formData: Partial<ITodo> | null) => {
    e.preventDefault()
    addTodoItem(formData?.title as string, formData?.description as string)
  }

  return (
    <form className="Form" onSubmit={(e) => handleSaveTodo(e, formData)}>
      <div>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" id='title' onChange={handleForm} />
        </div>
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input type="text" id='description' onChange={handleForm} />
      </div>
      <button disabled={formData === undefined ? true : false} type="submit">Add</button>
    </form>
  )
}

export default AddTodo