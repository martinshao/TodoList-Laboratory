import * as React from 'react';
import { Routes, Route, Outlet, Link } from 'react-router-dom';

function Test() {
  return <div>test</div>;
}

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Outlet />
      <Test />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />}>
        <Route path='messages' element={<Home />} />
        <Route path='tasks' element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to='/'>Go to the home page</Link>
      </p>
    </div>
  );
}
