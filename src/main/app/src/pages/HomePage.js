import React from 'react';

import 'bulma/css/bulma.css';
import '../css/home.css';

/* Component for home page */
const HomePage = () => {

  // Create state for activity selection with Games as default
  const [activity, updateActivity] = React.useState("games");

  // Update activty selection state based on dropdown
  const handleActivitySelection = evt => {
    updateActivity(evt.target.value);
  }

  return (
    <section className="section">

      {/*This container consists of the activities dropdown. */}
      <div className="container has-text-centered">
        <div className="control is-centered">
          <div className="select is-info is-fullwidth title is-2">
            <select className="is-focused" onChange={handleActivitySelection}>
              <option value="games">{"Games"}</option>
              <option value="active">{"Active"}</option>
              <option value="reading">{"Reading"}</option>
            </select>
          </div>
        </div>
      </div>

      <br />

      {/* This container consists of the buttons to schedule and browse. */}
      <div className="container has-text-centered is-centered">
        <button className="button is-large is-success is-rounded">Schedule an event</button>
        <button className="button is-large is-danger is-rounded">Browse</button>
      </div>
    </section>
  )
}

export default HomePage;
