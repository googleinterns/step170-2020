import React from 'react';

/** Render filter section of browse page depending on activity type selected. */

const FilterCommonSection = ({filterButtonClick, filterResetClick}) => {
  return (
    <React.Fragment>
      <p className="control"><button className="button is-danger" onClick={filterButtonClick}>Filter</button> </p>
      <p className="control"><button className="button is-info" onClick={filterResetClick} >Reset Filter</button></p>
    </React.Fragment>
  )
}

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

const ArticlesFilterBar = () => {
  // Todo: render articles filter bar.
  return null;
}

const VideosFilterBar = () => {
  // Todo: render videos filter bar.
  return null;
}

export {GamesFilterBar, ArticlesFilterBar, VideosFilterBar}