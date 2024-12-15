import { useState, ChangeEvent, SyntheticEvent } from "react";
import { useNavigate } from "react-router";

import useAuthStore from "../stores/useAuth";
import { createNewApplication } from "../services/applications";
import { IApplication } from "../interfaces/applications";

function ApplicationNewPage() {
  const {user} = useAuthStore();
  const navigate = useNavigate();

  const [formProps, setFormProps] = useState({
    position: '',
    companyName: '',
    location: '',
    requirements: '',
    responsibilities: '',
    salary: '',
    createdBy: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSetInputFormProps = (e:ChangeEvent<HTMLInputElement>, propName:string) => {
    setFormProps({
      ...formProps,
      [propName]: e.target.value,
    });
  }

  const handleGoBack = () => {
    navigate(-1);
  }

  const handleCreateApplication = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    setIsLoading(true);

    if(!user) return;

    // TODO: Clean up props (trim) 
    // TODO: check errors
    const data:IApplication = {
      ...formProps,
      createdBy: user.uid,
    }

    createNewApplication(data)
      .then(() => {
        navigate('/');
      }).catch((error) => {
        console.error(error);
      }).finally(() => {
        setIsLoading(false);
      });
  
    console.log(user?.uid);
  }

  return (
    <div className="container-fluid">
      <button onClick={handleGoBack}>X</button> 
      <h1>Let's create a new application</h1>
      <article>
        <form className="card" onSubmit={handleCreateApplication}>
          <fieldset>
            <label>
              Position
              <input type="text" name="position" placeholder="e.x. Software engineer" value={formProps.position} onChange={(e) => handleSetInputFormProps(e, 'position')} />
            </label>

            <label>
              Company
              <input name="text" value={formProps.companyName} onChange={(e) => handleSetInputFormProps(e, 'companyName')} />
            </label>

            <label>
              Location
              <input name="text" value={formProps.location} onChange={(e) => handleSetInputFormProps(e, 'location')} />
            </label>

            <label>
              Salary
              <input name="salary" value={formProps.salary} onChange={(e) => handleSetInputFormProps(e, 'salary')} />
            </label>
          </fieldset>

          <input type="submit" value="Create an application" disabled={isLoading} />
        </form>
      </article>
    </div>
  )
  // const {user} = useAuthStore();
  // const navigate = useNavigate();
  // const [isLoading, setIsLoading] = useState(false);

  // const handleLogout = () => {
  //   setIsLoading(true);
  //   firebaseSignOut()
  //     .then(() => {
  //       navigate('/login');
  //     }).catch(error => {
  //       console.error('handleLogout', error);
  //     });
  // }

  // return (
  //   <>
  //     <div className="container-fluid">
  //       <NavLink to="/">Dashboard</NavLink>
  //       <h1>Settings</h1>
  //       <p>You logged as {user?.email};</p>
  //       <button onClick={handleLogout} disabled={isLoading}>Log out</button>
  //     </div>
  //   </>
  // )
};

export default ApplicationNewPage;
