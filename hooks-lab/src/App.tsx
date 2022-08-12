
import './App.css';
// import Counter from './components/Counter'
// import UsePowDemo from './components/UsePowDemo'
// import UseRefDemo from './components/UseRefDemo'
// import UseCreationDemo from './components/UseCreationDemo'
// import UseMountDemo from './components/UseMountDemo'
// import UseUpdateDemo from './components/UseUpdateDemo'
// import UseStateDemo from './components/UseStateDemo'
// import SyntheticEventDemo from './components/SyntheticEventDemo'
import ClassComponent from './components/ClassComponent'

function App() {
  // console.info('App rendering...')
  return (
    <div className="App">
      <ClassComponent message='count' />
    </div>
  );
}

export default App;
