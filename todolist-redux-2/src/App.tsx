import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import './App.css';
import TodolistContainer from './features/todolist/TodoListContainer'

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        {/* <Counter /> */}
        <TodolistContainer />
      </header>
    </div>
  );
}

export default App;
