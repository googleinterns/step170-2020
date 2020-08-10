import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import { Link } from 'react-router-dom';
import GameCard from '../constants/GameCard.js';
import ArticleCard from '../constants/ArticleCard.js';
import VideoCard from '../constants/VideoCard.js';

/* Component for browse page */
const BrowsePage = ({ links, activityType, updateActivityType, updateActivity, updateServlet, articleData, videoData, gameData, id }) => {

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
                      <GameCard
                        key={key}
                        activityKey={data.key}
                        title={data.title}
                        url={data.url}
                        description={data.description}
                        updateActivity={updateActivity}
                      />
                    </div>
                  );
                } else if (activityType == "reading") {
                  return (
                    <div key={key}>
                      <ArticleCard
                        key={key}
                        activityKey={data.key}
                        title={data.title}
                        url={data.url}
                        publisher={data.publisher}
                        description={data.description}
                        updateActivity={updateActivity}
                      />
                    </div>
                  );
                } else if (activityType == "active") {
                  return (
                    <div key={key}>
                      <VideoCard
                        key={key}
                        activityKey={data.key}
                        title={data.title}
                        url={data.url}
                        updateActivity={updateActivity}
                        creator={data.creator}
                      />
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
