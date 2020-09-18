import React, { useState, useMemo, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import classnames from 'classnames';

import TodoStore from '../store/TodoStore';

const TodoAdd = () => {
  const todoStore = useContext(TodoStore);
  const [inputText, setInputText] = useState('');
  // const inputText = useRef<HTMLInputElement>(null);

  const { addTodo } = todoStore;

  const textLength = useMemo(() => {
    console.info('textLength...');
    return inputText.length;
  }, [inputText]);

  const onSubmit = () => {
    const todo = {
      title: inputText,
      completed: false,
    };
    addTodo(todo);
    setInputText('');
  };

  return (
    <div className='add-todo'>
      <input
        type='text'
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className='form-control'
        placeholder='需要处理的任务'
      />
      <button
        className={classnames('btn', 'btn-add', { active: textLength })}
        onClick={onSubmit}
      >
        add
      </button>
    </div>
  );
};

export default observer(TodoAdd);
