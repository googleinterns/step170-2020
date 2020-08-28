import React from 'react';
import filterActivities from '../hooks/browseActivitiesFilter.js';

const ActivitiesFilterBar = ({activityType, activityTypes, links, updateFilteredLinks}) => {
  // Filter states
  const [numOfPLayers, updateNumOfPlayers] = React.useState("");
  const [videoCategory, updateVideoCategory] = React.useState("*");
  const [videoDuration, updateVideoDuration] = React.useState("*");
  const [articleType, updateArticleType] = React.useState("*");
  const [articleLength, updateArticleLength] = React.useState("*");

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
        linkFilters.videoCategory = videoCategory;                // Yoga, Meditation, workout.
        linkFilters.videoDuration = videoDuration;                // Length of the video.
        break;
      case activityTypes.ARTICLES:
        linkFilters.articleType = articleType;          // Meditation, Technology, Social. 
        linkFilters.articleLength = articleLength;     
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
        updateVideoCategory("*");
        updateVideoDuration("*");
        break;
      case activityTypes.ARTICLES:
        updateArticleType("*");
        updateArticleLength("*");
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
    const name = evt.target.name;

    switch(activityType) {

      case activityTypes.GAMES:
        updateNumOfPlayers(value);
        break;

      case activityTypes.VIDEOS:
        if (name === "VideoCategory")
          updateVideoCategory(value);
        else if (name === "VideoDuration")
          updateVideoDuration(value);
        else
          console.log("Error: Unrecognized video filter modified.");
        break;

      case activityTypes.ARTICLES:
        if (name === "ArticleType")
          updateArticleType(value);
        else if (name === "ArticleLength")
          updateArticleLength(value);
        else
          console.log("Error: Unrecognized article filter modified.");
        break;

      default:
        console.log("Error: Invalid activity type selection.");
    }
  }

  const props = {handleFilterChange: handleFilterChange, filterButtonClick: filterButtonClick, filterResetClick: filterResetClick};

  switch(activityType) {
    case activityTypes.GAMES:
      const gameProps = Object.assign(props, {numOfPLayers: numOfPLayers});
      return <GamesFilterBar {...gameProps} />
    case activityTypes.VIDEOS:
      const videoProps = Object.assign(props, {videoCategory: videoCategory, videoDuration: videoDuration});
      return <VideosFilterBar {...videoProps} />
    case activityTypes.ARTICLES:
      const articleProps = Object.assign(props, {articleType: articleType, articleLength: articleLength});
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
      <div className="field is-grouped">
        <p className="control is-expanded has-icons-left"><span className="icon"><i className="fas fa-filter"></i></span><input className="input" onChange={handleFilterChange} type="text" value={numOfPlayers} placeholder="How many people are there with you? Eg. 0"></input></p>
        <FilterCommonSection filterButtonClick={filterButtonClick} filterResetClick={filterResetClick} />
      </div>
    </React.Fragment>
  )
}

/** Articles filter options. */
const ArticlesFilterBar = ({handleFilterChange, filterButtonClick, filterResetClick, articleType, articleLength}) => {
  return (
    <React.Fragment>
      <div className="field is-grouped">
        <div className="control is-expanded"><div className="select is-fullwidth">
          <select name="ArticleType" onChange={handleFilterChange} value={articleType}>
            <option value="*">{"All [Article Type]"}</option>
            <option value="tech">{"Technology"}</option>
            <option value="social">{"Social"}</option>
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
        <FilterCommonSection filterButtonClick={filterButtonClick} filterResetClick={filterResetClick} />
      </div>
    </React.Fragment>
  );
}

/** Videos filter options. */
const VideosFilterBar = ({handleFilterChange, filterButtonClick, filterResetClick, videoCategory, videoDuration}) => {
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
        <FilterCommonSection filterButtonClick={filterButtonClick} filterResetClick={filterResetClick} />
      </div>
    </React.Fragment>
  );
}

export default ActivitiesFilterBar
