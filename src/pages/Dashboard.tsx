import { useEffect, useState, ChangeEvent } from "react";
import { NavLink, useNavigate } from "react-router";
import { getApplications } from "../services/applications";
import useAuthStore from "../stores/useAuth";
import { IApplication } from "../interfaces/applications";

type ApplicationView = 'table' | 'card';

function Dashboard() {
  const { user } = useAuthStore();
  const [applicationsView, setApplicationsView] = useState<ApplicationView>('table')
  const navigate = useNavigate();

  const [applications, setApplications] = useState<IApplication[]>([]);

  const handleCreateNewApplication = () => {
    navigate('/application/new');
  }

  const onViewChange = (e:ChangeEvent<HTMLSelectElement>) => {
    setApplicationsView(e.target.value as ApplicationView);
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
            <div>
              Switch between table and cards
              <select name="view" aria-label="Select type of view for applications: table or cards" onChange={onViewChange} >
                <option value="table">Table</option>
                <option value="cards">Cards</option>
              </select>
            </div>

            {applicationsView == 'table' && <table>
              <thead>
                <tr>
                  <th scope="col">Position</th>
                  <th scope="col">URL</th>
                  <th scope="col">Status</th>
                  <th scope="col">Company</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application, i) =>
                  <tr key={`application-table${i}`}>
                    <th scope="row"><NavLink to={`/application/${application.uid}`}>{application.position}</NavLink></th>
                    <td><a href={application.url} target="_blank">Vacancy</a></td>
                    <td>{application.status && application.status}</td>
                    <td>{application.companyName && application.companyName}</td>
                  </tr>
                )}
              </tbody>
            </table>}

            {applicationsView == 'cards' && applications.map((application, i) =>
              <article key={`application-card${i}`}>
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
