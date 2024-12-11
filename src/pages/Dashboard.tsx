import { NavLink } from "react-router";

function Dashboard() {
  const applications = [{
    status: 'Wishlist',
    title: 'Javascript Web Developer',
    url: 'https://expleo-jobs-ie-en.icims.com/jobs/39883/job',
    company: 'Company',
    location: 'Nenagh Based',
    applied: '',
    updated: '',
    description: 'Some description of vacancy',
    notes: 'Your notes about this vacancy and HR process of the vacancy',
    salary: {
      currency: 'EUR',
      amount: '',
      frequency: '', // hour, day, week, month, year
    },
  }, {
    status: 'Wishlist',
    title: 'Javascript Web Developer 2',
    url: 'https://expleo-jobs-ie-en.icims.com/jobs/39883/job',
    company: 'Company',
    location: 'Nenagh Based',
    applied: '',
    updated: '',
    description: 'Some description of vacancy',
    notes: 'Your notes about this vacancy and HR process of the vacancy',
    salary: {
      currency: 'EUR',
      amount: '',
      frequency: '', // hour, day, week, month, year
    },
  }];

  return (
    <>
      <div className="container-fluid">
        <NavLink to="/settings">Settings</NavLink>
        <h1>Dashboard</h1>

        <p>
          <button>Create a new application</button>
        </p>

        <div>
          {applications.map((application, i) =>
            <article key={`application${i}`}>
              <p><small>{application.status}</small></p>
              <p><small>{application.company}</small></p>
              <h4>{application.title}</h4>
              <p>{application.description.slice(0, 48)}</p>
              <p>{application.notes.slice(0, 25)}</p>
              <a href={application.url} target="_blank">Vacancy</a>
            </article>
          )}
        </div>
      </div>
    </>
  )
}

export default Dashboard
