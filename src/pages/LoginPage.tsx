// import { useState } from 'react';
// import { Route } from 'react-router';
// import reactLogo from './assets/react.svg'
// import './App.css';
import { NavLink } from "react-router";

function LoginPage() {
  
  return (
    <>
      <NavLink to="/signup">Sign up</NavLink>
      <h1>Login page</h1>
    </>
  )
}

export default LoginPage;
