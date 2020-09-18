import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import TodoStore from '../store/TodoStore';

const Header = () => {
  const todoStore = useContext(TodoStore);
  const { info } = todoStore;

  return (
    <>
      <h1>
        <span className='title'>TODOLIST</span>
      </h1>

      <div className='alert'>
        <div className='info-item'>
          全部任务: <span className='badge'>{info.total}</span>
        </div>
        <div className='info-item'>
          已完成任务: <span className='badge'>{info.completed}</span>
        </div>
        <div className='info-item'>
          未完成任务: <span className='badge'>{info.notCompleted}</span>
        </div>
      </div>
    </>
  );
};

export default observer(Header);
