import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { NavLink } from "react-router";
import { getApplicationByUID } from "../services/applications";
import useAuthStore from "../stores/useAuth";
import { IApplication } from "../interfaces/applications";

import { STATUSES } from "../consts/statuses";

function ApplicationPage() {
  const params = useParams();
  const { user } = useAuthStore();
  const [isLoaded, setIsLoaded] = useState(false);
  // const navigate = useNavigate();

  let status;

  const [application, setApplication] = useState<IApplication | null>(null);

  for (const el of Object.values(STATUSES)) {
    if(application?.status === el.id) {
      status = el;
    }
  };

  useEffect(() => {
    if(user?.uid && params.uid) {
      getApplicationByUID(params.uid).then(application => {
        setApplication(application);
      }).finally(() => {
        setIsLoaded(true);
      });
    }
  }, [params.uid, user?.uid]);

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
          <p>{params.uid}</p>
          {isLoaded && <p>{status && status.name}</p>}
          {isLoaded && <h1>{application && application.position}</h1>}
          {!isLoaded && <h1>Loading...</h1>}
        </main>
      </div>
    </>
  )
}

export default ApplicationPage;
