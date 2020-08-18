import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import { Link } from 'react-router-dom';
import GameCard from '../constants/GameCard.js';
import ArticleCard from '../constants/ArticleCard.js';
import VideoCard from '../constants/VideoCard.js';

/* Component for browse page */
const BrowsePage = ({ links, activityType, updateActivityType, updateActivity, updateServlet, articleData, videoData, gameData}) => {

  // State for game filters
  const [linkFilters, updateLinksFilters] = React.useState({});             // this is the user entered input
  const [filteredLinks, updateFilteredLinks] = React.useState(links);       // The links or filtered links after user clicks button. 

  const filterButtonClick = evt => {
    updateFilteredLinks(links.filter(isWithinRange, linkFilters.numOfPlayers));
  }

  const filterResetClick = evt => {
    updateLinksFilters(Object.assign(linkFilters, {numOfPlayers: -1}));
    updateFilteredLinks(links);
    console.log(linkFilters.numOfPlayers);
  }

  // This is the function that gets triggered on typing any number in the textfield for GAME filters.
  const handleGameFilterChange = evt => {
    updateLinksFilters(Object.assign(linkFilters, {numOfPlayers: evt.target.value}));
  }

  // Update activty selection and web servlet state based on dropdown.
  const handleActivitySelection = evt => {
    updateActivityType(evt.target.value);
    updateServlet(evt.target.value == "active" ? videoData : evt.target.value == "reading" ? articleData : gameData);
  }

  // const placeholdertext = () => {
  //   if(linkFilters.numOfPlayers!= undefined && linkFilters.numOfPlayers != -1)
  //     return "" + linkFilters.numOfPlayers;
  //   else
  //     return "How many people are there?";
  // }

  function isWithinRange(game, input) {
    
    if( (game.minPlayer === 0 && game.maxPlayer === 0) ||                 // If there are no restrictions on the number of players
        (game.minPlayer === 0 && game.maxPlayer >= input) ||              // If no restriciton on minPlayer, but there is a max limit satisfied
        (game.maxPlayer === 0 && game.minPlayer <= input) ||              // If no restriction on maxPLayer, but minimum limit is satisfied
        (game.minPlayer <= input && game.maxPlayer >= input)  ) {         // If both are non-zero, and the game players are within limit. 
      return game;
    } 
    // Otherwise don't return. 
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

        <div className="field">
          <div className="control">
           <p> Filter out games based on the number of players:</p> <textarea onChange={handleGameFilterChange} className="textarea is-primary" placeholder="How many people are there?"></textarea> 
           <button className="button is-danger" onClick={filterButtonClick}>Filter</button>
           <button className="button is-info" onClick={filterResetClick} >Reset Filter</button>
          </div>
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
