import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import { Link } from 'react-router-dom';
import GameCard from '../constants/GameCard.js';
import ArticleCard from '../constants/ArticleCard.js';
import VideoCard from '../constants/VideoCard.js';
import ActivitiesFilterBar from '../constants/ActivitiesFilterBar';
import LoadingIndicator from '../constants/LoadingIndicator';

/* Component for browse page */
const BrowsePage = ({ links, activityType, updateActivityType, updateActivity, updateServlet,
  articleData, videoData, gameData, activityTypes }) => {

  const [filteredLinks, updateFilteredLinks] = React.useState(links);       // The links or filtered links after user clicks filter button.
  const [loading, updateLoading] = React.useState(false); // Controls display of loading indicator.

  // Update activty selection and web servlet state based on dropdown.
  const handleActivitySelection = evt => {
    const value = evt.target.value;

    // Stops update of activity links if activity type is not changed.
    if (value === activityType)
      return;

    updateLoading(true);
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
    updateLoading(false);
  },[links]);    // update filtered links to be links when user switches activity type.

  return (
    <section className="section-padding-large mb-3">
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
              {!loading && filteredLinks && filteredLinks.map((data, key) => {
                return (
                  <div key={key}>
                    {activityType === "games" ?
                      <GameCard data={data} updateScheduleActivity={updateActivity} parameters={{activityKey: data.key, title: data.title}} buttonText={"Schedule Activity"}/> :
                      activityType === "articles" ?
                      <ArticleCard data={data} updateScheduleActivity={updateActivity} parameters={{activityKey: data.key, title: data.title}} buttonText={"Schedule Activity"}/> :
                      <VideoCard data={data} updateScheduleActivity={updateActivity} parameters={{activityKey: data.key, title: data.title}} buttonText={"Schedule Activity"}/> }
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      {/** Show loading indicator once user presses the form submit button. */}
      {loading ? <LoadingIndicator /> : null}
    </section>
  )
}

export default BrowsePage;
