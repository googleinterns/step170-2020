import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import { Link } from 'react-router-dom';
import GameCard from '../constants/GameCard.js';
import ArticleCard from '../constants/ArticleCard.js';
import VideoCard from '../constants/VideoCard.js';
import ActivitiesFilterBar from '../constants/ActivitiesFilterBar';

/* Component for browse page */
const BrowsePage = ({ links, activityType, updateActivityType, updateActivity, updateServlet,
  articleData, videoData, gameData, activityTypes }) => {

  const [filteredLinks, updateFilteredLinks] = React.useState(links);       // The links or filtered links after user clicks filter button.

  // Update activty selection and web servlet state based on dropdown.
  const handleActivitySelection = evt => {
    const value = evt.target.value;
    updateActivityType(value);
    switch(value) {
      case activityTypes.GAMES:
        updateServlet(gameData);
        break;
      case activityTypes.VIDEOS:
        updateServlet(videoData);
        break;
      case activityTypes.ARTICLES:
        updateServlet(articleData);
        break;
      default:
        console.log("Error: Invalid activity type selection.");
    }
  }

  React.useEffect(() => {
    updateFilteredLinks(links);
  },[links]);    // update filtered links to be links when user switches activity type.

  return (
    <section className="section">
      <div className = "container">
        {/*Combo box bar component */}
        <div className="field has-addons">
          <div className="control is-expanded">
            <div className="select is-fullwidth">
              <select name="Activity" onChange={handleActivitySelection} value={activityType}>
                <option value="games">{"Games"}</option>
                <option value="videos">{"Active"}</option>
                <option value="articles">{"Reading"}</option>
              </select>
            </div>
          </div>
        </div>

        {/* This division is for filtering the results based on the user entered input. */}
        <ActivitiesFilterBar activityType={activityType} activityTypes={activityTypes}
          links={links} updateFilteredLinks={updateFilteredLinks} />

        <div className="section-padding-large mb-3">
          <div className="row">
            <div className="data-container is-fullwidth">
              {filteredLinks && filteredLinks.map((data, key) => {
                return (
                  <div key={key}>
                    {activityType === "games" ?
                      <GameCard data={data} updateScheduleActivity={updateActivity} parameters={{activityKey: data.key, title: data.title}} buttonText={"Schedule Activity"}/> :
                      activityType === "reading" ?
                      <ArticleCard data={data} updateScheduleActivity={updateActivity} parameters={{activityKey: data.key, title: data.title}} buttonText={"Schedule Activity"}/> :
                      <VideoCard data={data} updateScheduleActivity={updateActivity} parameters={{activityKey: data.key, title: data.title}} buttonText={"Schedule Activity"}/> }
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BrowsePage;
