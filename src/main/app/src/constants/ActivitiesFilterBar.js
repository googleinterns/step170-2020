import React from 'react';
import filterActivities from '../hooks/browseActivitiesFilter.js';

const ActivitiesFilterBar = ({activityType, activityTypes, links, updateFilteredLinks}) => {
  // Filter states
  const [numOfPLayers, updateNumOfPlayers] = React.useState("");
  const [videoType, updateVideoType] = React.useState("");
  const [articleType, updateArticleType] = React.useState("");

  /*
    This is the function that will be called when the filter button is clicked.
    This function calls the function that is declared in hooks folder to filter out games based on the entered value.
  */
  const filterButtonClick = evt => {
    const linkFilters = {}
    
    switch(activityType) {
      case activityTypes.GAMES:
        linkFilters.numOfPLayers = numOfPLayers;
        break;
      case activityTypes.VIDEOS:
        linkFilters.videoType = videoType;
        break;
      case activityTypes.ARTICLES:
        linkFilters.articleType = articleType;
        break;
      default:
        console.log("Error: Invalid activity type selection.");
    }

    filterActivities(links, activityType, activityTypes, linkFilters, updateFilteredLinks);
  }

  // When reset button is clicked, all the state go back to its default value (i.e, no filter) So, it displays all the links.
  const filterResetClick = evt => {
    switch(activityType) {
      case activityTypes.GAMES:
        updateNumOfPlayers("");
        break;
      case activityTypes.VIDEOS:
        updateVideoType("*");
        break;
      case activityTypes.ARTICLES:
        updateArticleType("*");
        break;
      default:
        console.log("Error: Invalid activity type selection.");
    }
    updateFilteredLinks(links);
  }

  /** This is the function that gets triggered on typing any value in the filter textfield.
      It sets the filters differently depending on the activity type selected. */
  const handleFilterChange = evt => {
    const value = evt.target.value;

    switch(activityType) {
      case activityTypes.GAMES:
        updateNumOfPlayers(value);
        break;
      case activityTypes.VIDEOS:
        updateVideoType(value);
        break;
      case activityTypes.ARTICLES:
        updateArticleType(value);
        break;
      default:
        console.log("Error: Invalid activity type selection.");
    }
  }

  const props = {handleFilterChange: handleFilterChange, filterButtonClick: filterButtonClick,
    filterResetClick: filterResetClick};

  switch(activityType) {
    case activityTypes.GAMES:
      const gameProps = Object.assign(props, {numOfPLayers: numOfPLayers});
      return <GamesFilterBar {...gameProps} />
    case activityTypes.VIDEOS:
      const videoProps = Object.assign(props, {videoType: videoType});
      return <VideosFilterBar {...videoProps} />
    case activityTypes.ARTICLES:
      const articleProps = Object.assign(props, {articleType: articleType});
      return <ArticlesFilterBar {...articleProps} />
    default:
      return null;
  }
}
/** Render filter section of browse page depending on activity type selected. */

const FilterCommonSection = ({filterButtonClick, filterResetClick}) => {
  return (
    <React.Fragment>
      <p className="control"><button className="button is-danger" onClick={filterButtonClick}>Filter</button> </p>
      <p className="control"><button className="button is-info" onClick={filterResetClick} >Reset Filter</button></p>
    </React.Fragment>
  )
}

/** Games filter options. */
const GamesFilterBar = ({handleFilterChange, filterButtonClick, filterResetClick, numOfPlayers}) => {
  return (
    <React.Fragment>
      <p> Filter out games based on the number of players:</p>
      <div className="field is-grouped">
        <p className="control is-expanded has-icons-left"><span className="icon"><i className="fas fa-filter"></i></span><input className="input" onChange={handleFilterChange} type="text" value={numOfPlayers} placeholder="How many people are there with you? Eg. 0"></input></p>
        <FilterCommonSection filterButtonClick={filterButtonClick} filterResetClick={filterResetClick} />
      </div>
    </React.Fragment>
  )
}

/** Articles filter options. */
const ArticlesFilterBar = ({handleFilterChange, filterButtonClick, filterResetClick, articleType}) => {
  return (
    <React.Fragment>
      <div className="field is-grouped">
        <div className="control is-expanded"><div className="select is-fullwidth">
          <select name="ArticleType" onChange={handleFilterChange} value={articleType}>
            <option value="*">{"All"}</option>
            <option value="tech">{"Technology"}</option>
            <option value="social">{"Social"}</option>
            <option value="meditation">{"Meditation"}</option>
          </select>
        </div></div>
        <FilterCommonSection filterButtonClick={filterButtonClick} filterResetClick={filterResetClick} />
      </div>
    </React.Fragment>
  );
}

/** Videos filter options. */
const VideosFilterBar = ({handleFilterChange, filterButtonClick, filterResetClick, videoType}) => {
  return (
    <React.Fragment>
      <div className="field is-grouped">
        <div className="control is-expanded"><div className="select is-fullwidth">
          <select name="VideoType" onChange={handleFilterChange} value={videoType}>
            <option value="*">{"All"}</option>
            <option value="yoga">{"Yoga"}</option>
            <option value="workout">{"Workout"}</option>
            <option value="meditation">{"Meditation"}</option>
          </select>
        </div></div>
        <FilterCommonSection filterButtonClick={filterButtonClick} filterResetClick={filterResetClick} />
      </div>
    </React.Fragment>
  );
}

export default ActivitiesFilterBar
