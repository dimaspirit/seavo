import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { NavLink } from "react-router";
import { firebaseSignIn } from "../services/auth";
import { useNavigate } from "react-router";
import useAuthStore from "../stores/useAuth";

function LoginPage() {
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

  const handleLogin = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    setIsLoading(true);

    firebaseSignIn({email, password})
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
      <NavLink to="/signup">Sign up</NavLink>
      <h1>Login page</h1>
      <article>
        <form className="card" onSubmit={handleLogin}>
          <fieldset>
            <label>
              Email
              <input type="email" name="email" placeholder="Email" value={email} onChange={handleInputEmail} />
            </label>

            <label>
              Password
              <input name="password" placeholder="Password" value={password} onChange={handleInputPassword} />
            </label>
          </fieldset>

          <input type="submit" value="Login" disabled={isLoading} />
        </form>
      </article>
    </div>
  )
}

export default LoginPage;
