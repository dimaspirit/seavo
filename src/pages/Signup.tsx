import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { NavLink } from "react-router";
import { firebaseSignUp } from "../services/auth";
import { useNavigate } from "react-router";
import useAuthStore from "../stores/useAuth";

function SignupPage() {
  const {user} = useAuthStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('useffect');
    if(user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleInputEmail = (e:ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleInputPassword = (e:ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const handleSignup = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    setIsLoading(true);

    firebaseSignUp({email, password})
      .then(() => {
        navigate("/");
      }).catch(error => {
        console.log(error);
      }).finally(() => {
        setIsLoading(true);
      });
  }

  return (
    <div className="container">
      <NavLink to="/login">Already have an account? Login</NavLink>

      <div className="card">
        <h1>Sign up page</h1>

        <form onSubmit={handleSignup}>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" required value={email} onChange={handleInputEmail} />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" required minLength={6} value={password} onChange={handleInputPassword} />
          </div>

          <div>
            <button type="submit" className="primary" disabled={isLoading}>Sign up</button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default SignupPage;
