import { useEffect } from 'react';
import { Routes, Route } from 'react-router';
// import reactLogo from './assets/react.svg'
import './App.css';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from './firebase';

import Dashboard from './pages/Dashboard';
import SettingsPage from './pages/SettingsPage';
import SignupPage from './pages/Signup';
import LoginPage from './pages/LoginPage';
import AuthProtectedRoute from './AuthProtectedRoute';
import ApplicationNewPage from './pages/ApplicationNewPage';
import ApplicationPage from './pages/ApplicationPage';

import useAuthStore from './stores/useAuth';

function App() {
  const { isInitialized, setUser, setInitialized } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async(user) => {
      console.log('user', user);
      setUser(user);
      setInitialized(true);
    });

    return () => {
      unsubscribe();
    };
  }, [setInitialized, setUser]);

  return (
    <>
      {isInitialized && <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route element={<AuthProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/application/new" element={<ApplicationNewPage />} />
          <Route path="/application/:uid" element={<ApplicationPage />} />
        </Route>
      </Routes>}

      {!isInitialized && <h1>Loading</h1>}
    </>
  )
}

export default App
