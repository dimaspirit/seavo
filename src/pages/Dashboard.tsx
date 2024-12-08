// import { useState } from 'react';
// import { Route } from 'react-router';
// import reactLogo from './assets/react.svg'
// import './App.css';
import { NavLink } from "react-router";
import useAuthStore from "../stores/useAuth";

function Dashboard() {
  const {user} = useAuthStore();

  return (
    <>
      <NavLink to="/settings">Settings</NavLink>
      <h1>Dashboard</h1>
      {user?.email};
    </>
  )
}

export default Dashboard
