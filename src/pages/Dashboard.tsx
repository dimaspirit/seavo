import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { getApplications } from "../services/applications";
import useAuthStore from "../stores/useAuth";
import { IApplication } from "../interfaces/applications";

function Dashboard() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [applications, setApplications] = useState<IApplication[]>([]);

  const handleCreateNewApplication = () => {
    navigate('/application/new');
  }

  useEffect(() => {
    if(user?.uid) {
      getApplications(user?.uid).then(applications => {
        setApplications(applications);
      });
    }
  }, [user?.uid]);

  return (
    <>
      <div className="container-fluid">
        <nav>
          <ul>
            <li><strong>SEAVO</strong></li>
          </ul>
          <ul>
            <li><NavLink to="/" className={'contrast'}>Dashboard</NavLink></li>
            <li><NavLink to="/settings" className={'contrast'}>Settings</NavLink></li>
          </ul>
        </nav>

        <main>
          <p>
            <button onClick={handleCreateNewApplication}>Create a new application</button>
          </p>

          <div>
            {applications.map((application, i) =>
              <article key={`application${i}`}>
                {application.status && <p><small>{application.status}</small></p>}
                {application.companyName && <p><small>{application.companyName}</small></p>}
                <h4>{application.position}</h4>
                <a href={application.url} target="_blank">Vacancy</a>
              </article>
            )}
          </div>
        </main>
      </div>
    </>
  )
}

export default Dashboard
