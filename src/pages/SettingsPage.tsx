import { useState } from "react";
import { NavLink, useNavigate } from "react-router";

import { firebaseSignOut } from "../services/auth";
import useAuthStore from "../stores/useAuth";

function SettingsPage() {
  const {user} = useAuthStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    setIsLoading(true);
    firebaseSignOut()
      .then(() => {
        navigate('/login');
      }).catch(error => {
        console.error('handleLogout', error);
      });
  }

  return (
    <>
      <div className="container-fluid">
        <NavLink to="/">Dashboard</NavLink>
        <h1>Settings</h1>
        <p>You logged as {user?.email};</p>
        <button onClick={handleLogout} disabled={isLoading}>Log out</button>
      </div>
    </>
  )
};

export default SettingsPage;
