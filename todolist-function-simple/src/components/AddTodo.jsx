import React, { useRef, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

function AddTodo(props) {

  const [canSubmit, setCanSubmit] = useState(false)
  const inputText = useRef()

  const handleInputChange = () => {
    if (inputText.current.value.length !== 0) {
      setCanSubmit(true)
    } else {
      setCanSubmit(false)
    }
  }

  const buttonStyle = useMemo(() => {
    if (canSubmit) return 'btn btn-add active'
    return 'btn btn-add'
  }, [canSubmit])

  const onSubmit = () => {
    const todo = {
      id: new Date().valueOf(),
      text: inputText.current.value,
      completed: false
    }
    props.onSubmit(todo)
    inputText.current.value = ''
    setCanSubmit(false)
  }

  return (
    <div className="add-todo">
      <input
        type="text"
        ref={inputText}
        onChange={handleInputChange}
        className="form-control"
        placeholder="需要处理的任务"
      />
      <button
        className={buttonStyle}
        onClick={onSubmit}
      >add</button>
    </div>
  )
}

AddTodo.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default AddTodo

