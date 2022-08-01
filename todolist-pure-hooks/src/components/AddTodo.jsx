import React, { useState, useContext } from 'react'
import { TodoListContext } from '../context/index'
import { Input, Button } from 'antd'

export default function AddTodo() {
  const [inputValue, setInputValue] = useState('')
  const { addTodoItem } = useContext(TodoListContext)

  const handleBtnClick = () => {
    console.info(inputValue)
    addTodoItem(inputValue)
    setInputValue('')
  }

  return (
    <>
      <Input
        placeholder="Basic usage"
        value={inputValue}
        style={{ width: '30rem', marginRight: '2rem' }}
        onChange={e => setInputValue(e.target.value)} />
      <Button
        type="primary"
        style={{ width: '80px' }}
        onClick={handleBtnClick}
      >提交</Button>
    </>
  )
}
