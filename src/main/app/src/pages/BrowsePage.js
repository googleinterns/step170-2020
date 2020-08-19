import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import { Link } from 'react-router-dom';
import GameCard from '../constants/GameCard.js';
import ArticleCard from '../constants/ArticleCard.js';
import VideoCard from '../constants/VideoCard.js';
import filterActivities from '../hooks/browseActivitiesFilter.js';
import {GamesFilterBar, ArticlesFilterBar, VideosFilterBar} from '../constants/ActivitiesFilterBar';

/* Component for browse page */
const BrowsePage = ({ links, activityType, updateActivityType, updateActivity, updateServlet, articleData, videoData, gameData}) => {

  // State for game filters
  const [linkFilters, updateLinksFilters] = React.useState({});             // This is the user entered input. To access the number of people, do linkFilters.numOfPeople.
  const [filteredLinks, updateFilteredLinks] = React.useState(links);       // The links or filtered links after user clicks filter button. 
  const [textBoxValue, settextBoxValue] = React.useState("");               // This state is to retain the value entered by the user un

  /* 
    This is the function that will be called when the filter button is clicked. 
    This function calls the function that is declared in hooks folder to filter out games based on the entered value.
  */
  const filterButtonClick = evt => {
   filterActivities(links, activityType, linkFilters, updateFilteredLinks);
  }

  // When reset button is clicked, all the state go back to its default value (i.e, no filter) So, it displays all the links.
  const filterResetClick = evt => {
    updateLinksFilters(Object.assign(linkFilters, delete linkFilters.numOfPlayers));     // numOfPLayers -1 if filter was reseted. In this case, filteredData will be links. 
    updateFilteredLinks(links);
    settextBoxValue("");
  }

  /** This is the function that gets triggered on typing any value in the filter textfield.
      It sets the filters differently depending on the activity type selected. */
  const handleFilterChange = evt => {
    const value = evt.target.value;

    if (value === "")
      updateLinksFilters({});
    else
      updateLinksFilters(Object.assign(linkFilters, 
        activityType === "games" ? {numOfPlayers: value} :
        activityType === "reading" ? {} :
        {}
      ));
    settextBoxValue(evt.target.value);
  }

  // Update activty selection and web servlet state based on dropdown.
  const handleActivitySelection = evt => {
    updateActivityType(evt.target.value);
    updateServlet(evt.target.value == "active" ? videoData : evt.target.value == "reading" ? articleData : gameData);
  }

  return (
    <section className="section-padding-large mb-3">
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

        {/* This division is for filtering the results based on the user entered input. */}
        {activityType === "games" ? 
          <GamesFilterBar handleFilterChange={handleFilterChange} filterButtonClick={filterButtonClick} filterResetClick={filterResetClick} textBoxValue={textBoxValue} /> :
          activityType === "reading" ? 
          <ArticlesFilterBar handleFilterChange={handleFilterChange} filterButtonClick={filterButtonClick} filterResetClick={filterResetClick} textBoxValue={textBoxValue} /> :
          <VideosFilterBar handleFilterChange={handleFilterChange} filterButtonClick={filterButtonClick} filterResetClick={filterResetClick} textBoxValue={textBoxValue} />
        }

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
