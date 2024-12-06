import { NavLink } from "react-router";

function SignupPage() {
  return (
    <div className="container">
      <NavLink to="/login">Already have an account? Login</NavLink>

      <div className="card">
        <h1>Sign up page</h1>

        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>

        <div>
          <button type="button" className="primary">Sign up</button>
        </div>
      </div>
    </div>
  )
}

export default SignupPage;
