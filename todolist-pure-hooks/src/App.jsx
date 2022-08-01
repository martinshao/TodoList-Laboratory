import React from 'react';
import './index.css';
import "antd/dist/antd.min.css"

import Provider from './context/index'
import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'

function App() {
  return (
    <div className="App">
      <Provider>
        <AddTodo></AddTodo>
        <TodoList></TodoList>
      </Provider>
    </div>
  )
}

export default App;
