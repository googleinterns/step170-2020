import React from 'react';
import filterActivities from '../hooks/browseActivitiesFilter.js';

const ActivitiesFilterBar = ({activityType, activityTypes, links, updateFilteredLinks, updateGameError}) => {
  // Filter states
  const [numOfPlayers, updateNumOfPlayers] = React.useState("");
  const [videoCategory, updateVideoCategory] = React.useState("*");
  const [videoDuration, updateVideoDuration] = React.useState("*");
  const [articleCategory, updateArticleCategory] = React.useState("*");
  const [articleLength, updateArticleLength] = React.useState("*");
  
  // When reset button is clicked, all the state go back to its default value (i.e, no filter) So, it displays all the links.
  const filterResetClick = evt => {
    switch(activityType) {
      case activityTypes.GAMES:
        updateNumOfPlayers("");
        break;
      case activityTypes.VIDEOS:
        updateVideoCategory("*");
        updateVideoDuration("*");
        break;
      case activityTypes.ARTICLES:
        updateArticleCategory("*");
        updateArticleLength("*");
        break;
      default:
        console.log("Error: Invalid activity type selection.");
    }
    updateFilteredLinks(links);
  }

  /** This function is to check whether integer entered for number of game players is a valid integer */
  const checkGameEntryValue = (value) => {
    let errors = false;

    // Check for non-integers strings.
    if (isNaN(value) || (value % 1 != 0)) {
      console.log("invalid input, please enter a positive integer value.");
      updateGameError(true);
      errors = true;
    }

    // Check for non-integers, including negative numbers, point.
    var intValue = parseInt(value); 
    if (intValue < 0) {
      console.log("invalid number, please enter a positive integer value.");
      updateGameError(true);
      errors = true;
    } 

    return errors;
  }

  /** This is the function that gets triggered on typing any value in the filter textfield.
      It sets the filters differently depending on the activity type selected. */
  const handleFilterChange = evt => {
    updateFilteredLinks(links);

    const linkFilters = {};
    const value = evt.target.value;
    const name = evt.target.name;

    switch(activityType) {
      case activityTypes.GAMES:
        updateNumOfPlayers(value);
        if (checkGameEntryValue(value)) break;
        updateGameError(false);
        linkFilters.numOfPlayers = value;
        break;
      case activityTypes.VIDEOS:
        if (name === "VideoCategory") {
          updateVideoCategory(value);
          linkFilters.videoCategory = value; // Yoga, Meditation, workout.
          linkFilters.videoDuration = videoDuration;
        } else if (name === "VideoDuration") {
          updateVideoDuration(value);
          linkFilters.videoDuration = value; // Length of the video.
          linkFilters.videoCategory = videoCategory;
        } else {
          console.log("Error: Unrecognized video filter modified.");
        } 
        break;
      case activityTypes.ARTICLES: 
        if (name === "ArticleCategory") {
            updateArticleCategory(value); 
            linkFilters.articleCategory = value; // Meditation, Short Stories, Cooking.
            linkFilters.articleLength = articleLength;
        } else if (name === "ArticleLength") {
            updateArticleLength(value);
            linkFilters.articleLength = value;
            linkFilters.articleCategory = articleCategory;
        } else {
            console.log("Error: Unrecognized article filter modified.");
        } 
        break;
      default:
        console.log("Error: Invalid activity type selection.");
    }
    filterActivities(links, activityType, activityTypes, linkFilters, updateFilteredLinks);
  }

  const props = {handleFilterChange: handleFilterChange, filterResetClick: filterResetClick};

  switch(activityType) {
    case activityTypes.GAMES:
      const gameProps = Object.assign(props, {numOfPlayers: numOfPlayers});
      return <GamesFilterBar {...gameProps} />
    case activityTypes.VIDEOS:
      const videoProps = Object.assign(props, {videoCategory: videoCategory, videoDuration: videoDuration});
      return <VideosFilterBar {...videoProps} />
    case activityTypes.ARTICLES:
      const articleProps = Object.assign(props, {articleCategory: articleCategory, articleLength: articleLength});
      return <ArticlesFilterBar {...articleProps} />
    default:
      return null;
  }
}
/** Render filter section of browse page depending on activity type selected. */

const FilterCommonSection = ({filterResetClick}) => {
  return (
    <React.Fragment>
      <p className="control"><button className="button is-info" onClick={filterResetClick}>Reset Filter</button></p>
    </React.Fragment>
  )
}

/** Games filter options. */
const GamesFilterBar = ({handleFilterChange, filterResetClick, numOfPlayers, gameError}) => {
  return (
    <React.Fragment>
      <div className="field is-grouped" style={{margin:0}}>
        <p className="control is-expanded has-icons-left"><span className="icon"><i className="fas fa-filter"></i></span><input className="input" onChange={handleFilterChange} type="text" value={numOfPlayers} placeholder="How many people are there with you? Eg. 0"></input></p>
        <FilterCommonSection filterResetClick={filterResetClick} />
      </div>
    </React.Fragment>
  )
}

/** Articles filter options. */
const ArticlesFilterBar = ({handleFilterChange, filterResetClick, articleCategory, articleLength}) => {
  return (
    <React.Fragment>
      <div className="field is-grouped">
        <div className="control is-expanded"><div className="select is-fullwidth">
          <select name="ArticleCategory" onChange={handleFilterChange} value={articleCategory}>
            <option value="*">{"All [Article Category]"}</option>
            <option value="cooking">{"Cooking"}</option>
            <option value="fiction">{"Short Stories"}</option>
            <option value="meditation">{"Meditation"}</option>
          </select>
        </div></div>
        <div className="control is-expanded"><div className="select is-fullwidth">
          <select name="ArticleLength" onChange={handleFilterChange} value={articleLength}>
            <option value="*">{"All [Article Length]"}</option>
            <option value="short">{"Short [3 mins or less]"}</option>
            <option value="medium">{"Medium [4-9 mins]"}</option>
            <option value="long">{"Long [10 mins or more]"}</option>
          </select>
        </div></div>
        <FilterCommonSection filterResetClick={filterResetClick} />
      </div>
    </React.Fragment>
  );
}

/** Videos filter options. */
const VideosFilterBar = ({handleFilterChange, filterResetClick, videoCategory, videoDuration}) => {
  return (
    <React.Fragment>
      <div className="field is-grouped">
        <div className="control is-expanded"><div className="select is-fullwidth">
          <select name="VideoCategory" onChange={handleFilterChange} value={videoCategory}>
            <option value="*">{"All [Video Category]"}</option>
            <option value="yoga">{"Yoga"}</option>
            <option value="workout">{"Workout"}</option>
            <option value="meditation">{"Meditation"}</option>
          </select>
        </div></div>
        <div className="control is-expanded"><div className="select is-fullwidth">
          <select name="VideoDuration" onChange={handleFilterChange} value={videoDuration}>
            <option value="*">{"All [Video Duration]"}</option>
            <option value="short">{"Less than 15 minutes"}</option>
            <option value="medium">{"Greater than 15 minutes and less than 30 minutes"}</option>
            <option value="large">{"Greater than 30 minutes"}</option>
          </select>
        </div></div>
        <FilterCommonSection filterResetClick={filterResetClick} />
      </div>
    </React.Fragment>
  );
}

export default ActivitiesFilterBar
