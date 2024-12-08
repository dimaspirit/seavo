import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { firebaseSignOut } from "../services/auth";

function SettingsPage() {
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
      <NavLink to="/">Dashboard</NavLink>
      <h1>Settings</h1>
      <button onClick={handleLogout} disabled={isLoading}>Log out</button>
    </>
  )
};

export default SettingsPage;
