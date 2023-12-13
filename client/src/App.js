import React from 'react';
import './App.css';

function App() {
  const [activities, setActivities] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/activities`,
      );
      const data = await result.json();
      setActivities(data);
    };
    fetchData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const newActivity = {
      name: e.target.activity.value,
      time: e.target.time.value,
    };

    await fetch(`${process.env.REACT_APP_BACKEND_URL}/activity`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newActivity),
    });

    e.target.activity.value = '';
    e.target.time.value = '';
    window.location.reload();
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Productivity Tracker</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="activity">Activity:</label>
            <input
              type="text"
              id="activity"
              name="activity"
              autoComplete="off"
            />
          </div>
          <div>
            <label htmlFor="time">Time Taken:</label>
            <input type="text" id="time" name="time" autoComplete="off" />
          </div>
          <button type="submit">Add</button>
        </form>
      </header>
      <main className="app-main">
        <h2>Today</h2>
        {activities && activities.length > 0 ? (
          <ol>
            {activities.map((activity) => (
              <li key={activity._id}>
                {activity.name} - {activity.time}
              </li>
            ))}
          </ol>
        ) : (
          <p>No activities yet</p>
        )}
      </main>
    </div>
  );
}

export default App;
