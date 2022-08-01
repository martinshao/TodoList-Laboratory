import * as React from 'react'
import { TodoContext } from '../context/todoContext'
import { TodoContextType, ITodo } from '../@types/todo'

const AddTodo: React.FC = () => {
  const { saveTodo } = React.useContext(TodoContext) as TodoContextType
  const [formData, setFormData] = React.useState<ITodo | {}>()

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    })
  }

  const handleSaveTodo = (e: React.FormEvent, formData: ITodo | any) => {
    e.preventDefault()
    saveTodo(formData)
  }

  return (
    <form className='Form' onSubmit={(e) => handleSaveTodo(e, formData)}>
      <div>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" onChange={handleForm} />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input type="text" id="description" onChange={handleForm} />
        </div>
      </div>
      <button disabled={formData === undefined ? true : false}>Add</button>
    </form>
  )
}

export default AddTodo