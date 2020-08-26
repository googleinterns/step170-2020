import React from 'react';
import { Link } from 'react-router-dom';
import {Collapse, IconButton} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';

import 'bulma/css/bulma.css';
import '../css/home.css';
import logo from '../assets/logo.png';

/* Component for home page */
const HomePage = ({ activity, activityType, updateActivityType, updateServlet, articleData, 
  videoData, gameData, eventScheduled, updateEventScheduled, updateActivity, activityTypes }) => {

  // Update activty selection state based on dropdown
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
  
  const emptyActivity = () => {
    {updateActivity({})}    // emptying activity so that it changes when reaching homePage
  }
   
  return (
    <section className="container">
      {/* Alert message for successfull event scheduling. */}
      <Collapse in={eventScheduled !== ""} className="mb-4">
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                updateEventScheduled("");
              }}>
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          Event successfully scheduled! <a href={eventScheduled}>Click here</a> to view it on your calendar.
        </Alert>
      </Collapse>

      {/* Added logo to homepage. */}
      <div className="container has-text-centered">
        <div>
          <img src={logo} alt="Logo" width="800" height="100"/>
        </div>
      </div>

      {/*This container consists of the activities dropdown. */}
      <div className="container has-text-centered">
        <div className="control is-centered">
          <div className="select is-info is-fullwidth title is-2">
            <select className="is-focused" onChange={handleActivitySelection} value={activityType}>
              <option value="games">{"Games"}</option>
              <option value="videos">{"Active"}</option>
              <option value="articles">{"Reading"}</option>
            </select>
          </div>
        </div>
      </div>

      <br/>

      {/* This container consists of the buttons to schedule and browse. */}
      <div className="container has-text-centered is-centered">
        <Link to='/schedule-activity'>
        <button value="schedule" className="button is-large is-success is-rounded" onClick={emptyActivity}>Schedule an event</button>
        </Link>
        <Link to='/browse'>
        <button value="browse" className="button is-large is-danger is-rounded" >Browse</button>
        </Link>
      </div>
    </section>
  )
}

export default HomePage;
