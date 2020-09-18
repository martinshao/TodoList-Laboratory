import React from 'react';
import './App.css';

import Header from './components/Header';
import TodoAdd from './components/TodoAdd';
import Todolist from './components/Todolist';

function App() {
  return (
    <div className='todo-list-app'>
      <Header />
      <TodoAdd />
      <Todolist />
    </div>
  );
}

export default App;
