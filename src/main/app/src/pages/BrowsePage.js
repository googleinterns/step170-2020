import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '../css/home.css';

// This is a stateless, functional React component used to render each resource in a card format. 
const BrowseCard = ({ title, description, url }) => {
  if (!description) return <div />
  return (
    <div className = "p-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title text-info">{title}</h5>
          <p className="card-text text-secondary" >{description}</p>
          <a className="card-text btn btn-light" href={url}>View more</a>
          <button className="button is-small is-rounded">schedule event</button>
        </div>
      </div>
    </div>
  );
};

/* Component for browse page */
const BrowsePage = () => {

  // Create initial state for activity selection with Games as default
  const [activity, updateActivity] = React.useState("games");

  // Update activty selection state based on dropdown
  const handleActivitySelection = evt => {
    updateActivity(evt.target.value);
  }

  const [links, updateLinks] = React.useState([]);
  useEffect(() => {
    console.log(activity);
    fetch('./articleData') // TODO(tdonohugh): change web servlet based on activity.
    .then((resp) => resp.json())
    .then(data => { 
      updateLinks(data);
      console.log(data);
    }).catch(err => {
      console.log('err', err);
    });
  },[activity]);

  return (
    <section className="section-padding-large mb-3 mx-5">
      {/*Combo box bar component */}
      <div className="field has-addons">
        <div className="control is-expanded">
          <div className="select is-fullwidth">
            <select name="Activity" onChange={handleActivitySelection}>
              <option value="Games">{"Games"}</option>
              <option value="Reading">{"Reading"}</option>
              <option value="Active">{"Active"}</option>
            </select>
          </div>
        </div>
        <div className="control">
          <button type="submit" className="button is-normal">Choose</button>
        </div>
      </div>

      <div className="section-padding-large mb-3 mx-5">
        <div className="row">
          <div className="data-container">
            {links.map((data, key) => {
              return (
                <div key={key}>
                  <BrowseCard
                    key={key}
                    title={data.title}
                    description={data.description}
                    url={data.url}
                  />
                </div>
              );
            })}
          </div> 
        </div> 
      </div>
    </section>
  )
}

export default BrowsePage;