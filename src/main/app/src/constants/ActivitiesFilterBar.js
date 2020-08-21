import React from 'react';
import filterActivities from '../hooks/browseActivitiesFilter.js';

const ActivitiesFilterBar = ({activityType, activityTypes, links, updateFilteredLinks}) => {
  // State for game filters
  const [linkFilters, updateLinksFilters] = React.useState({});             // This is the user entered input. To access the number of people, do linkFilters.numOfPeople.
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
    else {
      switch(activityType) {
        case activityTypes.GAMES:
          updateLinksFilters(Object.assign(linkFilters, {numOfPlayers: value}));
          break;
        case activityTypes.VIDEOS:
          updateLinksFilters(Object.assign(linkFilters, {videoType: value}));
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

  const props = {handleFilterChange: handleFilterChange, filterButtonClick: filterButtonClick,
    filterResetClick: filterResetClick, textBoxValue: textBoxValue};

  switch(activityType) {
    case activityTypes.GAMES:
      return <GamesFilterBar {...props} />
    case activityTypes.VIDEOS:
      return <VideosFilterBar {...props} />
    case activityTypes.ARTICLES:
      return <ArticlesFilterBar {...props} />
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
const GamesFilterBar = ({handleFilterChange, filterButtonClick, filterResetClick, textBoxValue}) => {
  return (
    <React.Fragment>
      <p> Filter out games based on the number of players:</p>
      <div className="field is-grouped">
        <p className="control is-expanded has-icons-left"><span className="icon"><i className="fas fa-filter"></i></span><input className="input" onChange={handleFilterChange} type="text" value={textBoxValue} placeholder="How many people are there with you? Eg. 0"></input></p>
        <FilterCommonSection filterButtonClick={filterButtonClick} filterResetClick={filterResetClick} />
      </div>
    </React.Fragment>
  )
}

/** Articles filter options. */
const ArticlesFilterBar = ({handleFilterChange, filterButtonClick, filterResetClick, textBoxValue}) => {
  return (
    <React.Fragment>
      <div className="field is-grouped">
        <div className="control is-expanded"><div className="select is-fullwidth">
          <select name="ArticleType" onChange={handleFilterChange} value={textBoxValue}>
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
const VideosFilterBar = ({handleFilterChange, filterButtonClick, filterResetClick, textBoxValue}) => {
  return (
    <React.Fragment>
      <div className="field is-grouped">
        <div className="control is-expanded"><div className="select is-fullwidth">
          <select name="VideoType" onChange={handleFilterChange} value={textBoxValue}>
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
