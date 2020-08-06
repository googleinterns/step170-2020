import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@material-ui/core'
import {testData} from '../test.js' ;
import { Link } from 'react-router-dom';

// This is a stateless, functional React component used to render each resource in a card format. 
const BrowseCard = ({ activityKey, title,  url ,updateActivity}) => {
  if (!title) return <div />
  return (
    <div className = "p-3">
      <div className="card">
        <div className="card-content">
          <h1 className="title">{title}</h1>
          <a className="button is-small is-rounded" href={url}>View more</a> 
          <Link to='/schedule-activity'>
          <button className="button is-small is-rounded" onClick= {() => updateActivity({activityKey: activityKey})}> Schedule event</button>
          </Link>
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
const BrowsePage = ({links, activityType, updateActivityType, updateActivity, updateServlet}) => {

  // Update activty selection and web servlet state based on dropdown.
  const handleActivitySelection = evt => {
    updateActivityType(evt.target.value);
    updateServlet(evt.target.value == "active" ? videoData : evt.target.value == "reading" ? articleData : gameData);
  }

  return (
    <section className="section-padding-large mb-3 mx-5">
      <div className = "container">
        {/*Combo box bar component */}
        <div className="field has-addons">
          <div className="control is-expanded">
            <div className="select is-fullwidth">
              <select name="Activity" onChange={handleActivitySelection} value={activityType}>
                <option value="games">{"Games"}</option>
                <option value="reading">{"Reading"}</option>
                <option value="active">{"Active"}</option>
              </select>
            </div>
          </div>
        </div>

        <div className="section-padding-large mb-3 mx-5">
          <div className="row">
            <div className="data-container is-widescreen">
              {testData.map((data, key) => {
                
                return (
                  <div key={key}>
                    <BrowseCard
                      key={key}
                      activityKey={data.key}
                      title={data.title}
                      url={data.url}
                      updateActivity={updateActivity}
                    />
                  </div>
                );
              })}
            </div> 
          </div> 
        </div>
      </div>
    </section>
  )
}

export default BrowsePage;
