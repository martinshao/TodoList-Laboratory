import React from 'react'
import TodoProvider from './context/todoContext'
import ThemeProvider from './context/themeContext'
import AddTodo from './components/AddTodo';
import Todos from './containers/Todos'
import ThemeWrapper from './components/ThemeWrapper'
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <TodoProvider>
        <ThemeWrapper>
          <main className="App">
            <h1>My Todos</h1>
            <AddTodo />
            <Todos />
          </main>
        </ThemeWrapper>
      </TodoProvider>
    </ThemeProvider>
  );
}

export default App;
