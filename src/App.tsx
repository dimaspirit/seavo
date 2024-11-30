// import { useState } from 'react';
import { Routes, Route, NavLink } from 'react-router';
// import reactLogo from './assets/react.svg'
import './App.css';

import Dashboard from './pages/Dashboard';
import UserSettings from './pages/UserSettings';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <nav>
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/user-settings">User settings</NavLink>
      </nav>

      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="user-settings" element={<UserSettings />} />
      </Routes>

      {/* <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
