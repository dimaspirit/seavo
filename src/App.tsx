import { useEffect } from 'react';
import { Routes, Route } from 'react-router';
// import reactLogo from './assets/react.svg'
import './App.css';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from './firebase';

import Dashboard from './pages/Dashboard';
import UserSettings from './pages/UserSettings';
import SignupPage from './pages/Signup';
import LoginPage from './pages/LoginPage';
import AuthProtectedRoute from './AuthProtectedRoute';
import useAuthStore from './stores/useAuth';

function App() {
  const { user } = useAuthStore();
  // const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async(user) => {
      console.log(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // useEffect(() => {
  //     const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
  //       console.log(user);
  //       // if (!user) {
  //       //   // go to login page if user doesn't exist
  //       //   // setLoading(false)
  //       //   // navigate('/login')
  //       // } else {
  //       //   // setUser(user)
  //       //   // setToken(await user?.getIdToken())
  //       // }
  //     });

  //     return () => {
  //       unsubscribe()
  //     }
  //   }, []);
  // }

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route element={<AuthProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/user-settings" element={<UserSettings />} />
        </Route>
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
