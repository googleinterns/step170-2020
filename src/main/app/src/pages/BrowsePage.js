import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@material-ui/core'

// This is a stateless, functional React component used to render each resource in a card format. 
const BrowseCard = ({ title, url }) => {
  if (!title) return <div />
  return (
    <div className = "p-3">
      <div className="card">
        <div className="card-content">
          <h1 className="title">{title}</h1>
          <button className="button is-small is-rounded" href={url}>View more</button>
          <button className="button is-small is-rounded">schedule event</button>
        </div>
      </div>
    </div>
  );
};

// Web Servlet links.
const articleData = './articleData';
const videoData = './videoData';
const gameData = './gameData';

/* Component for browse page */
const BrowsePage = ({links, activity, updateActivity}) => {

  // Update activty selection and web servlet state based on dropdown.
  const handleActivitySelection = evt => {
    updateActivity(evt.target.value);
  }

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
          <div className="data-container is-widescreen">
            {links.map((data, key) => {
              return (
                <div key={key}>
                  <BrowseCard
                    key={key}
                    title={data.title}
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
