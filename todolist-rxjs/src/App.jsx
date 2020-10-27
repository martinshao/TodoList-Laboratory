import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'
import Todos from './components/Todos'

import 'todomvc-app-css/index.css'

function App() {
  return (
    <>
      <Router>
        <Route exact path="/" render={() => <Redirect to="/todolist-rxjs/" />} />
      </Router>
      <Router basename="/todolist-rxjs/">
        <Route exact path="/" component={Todos} />
        <Route exact path="/:filter" component={Todos} />
      </Router>
    </>
  );
}

export default App;
