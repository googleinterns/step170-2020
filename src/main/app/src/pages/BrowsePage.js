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

  // State for game filters
  const [linkFilters, updateLinksFilters] = React.useState({});             // This is the user entered input. To access the number of people, do linkFilters.numOfPeople.
  const [filteredLinks, updateFilteredLinks] = React.useState(links);       // The links or filtered links after user clicks filter button. 
  const [textBoxValue, settextBoxValue] = React.useState("");               // This state is to retain the value entered by the user un

  /* 
    This is the function that will be called when the filter button is clicked. 
    This function calls the function that is declared in hooks folder to filter out games based on the entered value.
  */
  const filterButtonClick = evt => {
    filterActivities(links, activityType, activityTypes, linkFilters, updateFilteredLinks);
  }

  // When reset button is clicked, all the state go back to its default value (i.e, no filter) So, it displays all the links.
  const filterResetClick = evt => {
    // When the Reset button is clicked, delete all the filters such that linkFilters has no fields anymore, and filteredLinks points to links itself.
    updateLinksFilters(Object.assign(linkFilters, delete linkFilters.numOfPlayers)); 
    updateLinksFilters(Object.assign(linkFilters, delete linkFilters.videoLength));
    updateFilteredLinks(links);
    settextBoxValue("");
  }

  /** This is the function that gets triggered on typing any value in the filter textfield.
      It sets the filters differently depending on the activity type selected. */
  const handleFilterChange = evt => {
    const value = evt.target.value;

    if (value === "")
      updateLinksFilters({});
    else {
      switch(activityType) {
        case activityTypes.GAMES:
          updateLinksFilters(Object.assign(linkFilters, {numOfPlayers: value}));
          break;
        case activityTypes.VIDEOS:
          // If the activity length is the filter that needs to be taken care of. 
          // These three drop down options come together as one in videoLength inside linkFilters. 
          if (value === "short" || value === "medium" || value ==="large") {
            updateLinksFilters(Object.assign(linkFilters, {videoLength: value}));
          }
          else {
            updateLinksFilters(Object.assign(linkFilters, delete linkFilters.videoLength));
            // Code to handle other filters of activityType= Videos, in addition to deleting the length field from the filter.
          }
          break;
        case activityTypes.ARTICLES:
          updateLinksFilters(Object.assign(linkFilters, {articleType: value}));
          break;
        default:
          console.log("Error: Invalid activity type selection.");
      }
    }
    settextBoxValue(evt.target.value);    
  }
  
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
