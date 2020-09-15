import React from 'react';
import './App.css';

function App() {
  return (
    <div className="todo-list-app">
      <h1>
        <span className="title">TODOLIST</span>
      </h1>
      <div className="add-todo">
        <input type="text" className="form-control" placeholder="需要处理的任务" />
        <button className="add" disabled>add</button>
      </div>
      <div className="content">
        <ul className="todo-list">
          <li>
            <input type="checkbox" className="todo-checkbox" defaultChecked />
            <label></label>
            <span className="todo-text">1</span>
            <span className="delete" />
          </li>
          <li className="archived">
            <input type="checkbox" className="todo-checkbox" />
            <label></label>
            <span className="todo-text">1</span>
            <span className="delete" />
          </li>
          <li className="archived">
            <input type="checkbox" className="todo-checkbox" />
            <label></label>
            <span className="todo-text">1</span>
            <span className="delete" />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
