import logo from './logo.svg';
import './App.css';
import Toggler from './components/Toggler'
import TrafficLights from './components/TrafficLights';
import MouseMove from './components/MouseMove';

function App() {
  return (
    <div className="App">
      <Toggler />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <TrafficLights />
        <MouseMove />
      </header>
    </div>
  );
}

export default App;
