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
        <nav>
          <ul>
            <li><strong>SEAVO</strong></li>
          </ul>
          <ul>
            <li><NavLink to="/" className={'secondary'}>Dashboard</NavLink></li>
            <li><NavLink to="/settings" className={({ isActive }) => isActive ? "contrast" : ""}>Settings</NavLink></li>
          </ul>
        </nav>

        <main>
          <p>You logged as {user?.email};</p>
          <button onClick={handleLogout} disabled={isLoading}>Log out</button>
        </main>
      </div>
    </>
  )
};

export default SettingsPage;
