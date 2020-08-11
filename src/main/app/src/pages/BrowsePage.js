import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import { Link } from 'react-router-dom';
import GameCard from '../constants/GameCard.js';
import ArticleCard from '../constants/ArticleCard.js';
import VideoCard from '../constants/VideoCard.js';

/* Component for browse page */
const BrowsePage = ({ links, activityType, updateActivityType, updateActivity, updateServlet, articleData, videoData, gameData}) => {

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
            <div className="data-container is-fullwidth">
              {links.map((data, key) => {
                if (activityType == "games") {
                  return (
                    <div key={key}>
                      <GameCard data={data} updateActivity={updateActivity}/>
                    </div>
                  );
                } else if (activityType == "reading") {
                  return (
                    <div key={key}>
                      <ArticleCard data={data} updateActivity={updateActivity}/>
                    </div>
                  );
                } else if (activityType == "active") {
                  return (
                    <div key={key}>
                      <VideoCard data={data} updateActivity={updateActivity}/>
                    </div>
                  );
                }
              })}
            </div> 
          </div> 
        </div>
      </div>
    </section>
  )
}

export default BrowsePage;
