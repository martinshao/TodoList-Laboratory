import React from 'react';
import './App.css';
import TodoProvider from './contexts/todoProvider';
import AddTodo from './components/AddTodo';
import Todos from './containers/Todos';

function App() {
  return (
    <TodoProvider>
      <main className="App">
        <h1>My Todos</h1>
        <AddTodo />
        <Todos />
      </main>
    </TodoProvider>
  );
}

export default App;
