import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import { Link } from 'react-router-dom';
import GameCard from '../constants/GameCard.js';
import ArticleCard from '../constants/ArticleCard.js';
import VideoCard from '../constants/VideoCard.js';
import filterActivities from '../hooks/browseActivitiesFilter.js';

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
    console.log(linkFilters.numOfPlayers);
    updateLinksFilters(Object.assign(linkFilters, delete linkFilters.numOfPlayers));     // numOfPLayers -1 if filter was reseted. In this case, filteredData will be links. 
    updateFilteredLinks(links);
    settextBoxValue("");
    console.log(linkFilters.numOfPlayers);
  }

  // This is the function that gets triggered on typing any number in the textfield for GAME filters.
  const handleGameFilterChange = evt => {
    updateLinksFilters(Object.assign(linkFilters, {numOfPlayers: evt.target.value}));
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
        <p> Filter out games based on the number of players:</p> 
        <div className="field is-grouped">
          <p className="control is-expanded has-icons-left"><span className="icon"><i className="fas fa-filter"></i></span><input className="input" onChange={handleGameFilterChange} type="text" value={textBoxValue} placeholder="How many people are there with you? Eg. 0"></input> </p>
          <p className="control"><button className="button is-danger" onClick={filterButtonClick}>Filter</button> </p>
          <p className="control"><button className="button is-info" onClick={filterResetClick} >Reset Filter</button></p>
        </div>

        <div className="section-padding-large mb-3">
          <div className="row">
            <div className="data-container is-fullwidth">
              {filteredLinks.map((data, key) => {
                if (activityType === "games") {
                  return (
                    <div key={key}>
                      <GameCard data={data} updateScheduleActivity={updateActivity} parameters={{activityKey: data.key, title: data.title}} buttonText={"Schedule Activity"}/>
                    </div>
                  );
                } else if (activityType === "reading") {
                  return (
                    <div key={key}>
                      <ArticleCard data={data} updateScheduleActivity={updateActivity} parameters={{activityKey: data.key, title: data.title}} buttonText={"Schedule Activity"}/>
                    </div>
                  );
                } else if (activityType === "active") {
                  return (
                    <div key={key}>
                      <VideoCard data={data} updateScheduleActivity={updateActivity} parameters={{activityKey: data.key, title: data.title}} buttonText={"Schedule Activity"}/>
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
