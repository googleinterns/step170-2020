import React from 'react';
import { Link } from 'react-router-dom';
import {Collapse, IconButton} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';

import 'bulma/css/bulma.css';
import '../css/home.css';
import logo from '../assets/logo.png';

/* Component for home page */
const HomePage = ({ activity, activityType, updateActivityType, updateServlet, articleData, videoData, gameData, eventScheduled, updateEventScheduled, updateActivity }) => {

  // Update activty selection state based on dropdown
  const handleActivitySelection = evt => {
    updateActivityType(evt.target.value);
    updateServlet(evt.target.value == "active" ? videoData : evt.target.value == "reading" ? articleData : gameData);
  }
  
  const emptyActivity = () => {
    {updateActivity({})}    // emptying activity so that it changes when reaching homePage
  }
   

  return (
    <section className="section">
      
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
              <option value="active">{"Active"}</option>
              <option value="reading">{"Reading"}</option>
            </select>
          </div>
        </div>
      </div>

      <br/>

      {/* This container consists of the buttons to schedule and browse. */}
      <div className="container has-text-centered is-centered">
        <Link to='/schedule-activity'>
        <button className="button is-large is-success is-rounded" onClick={emptyActivity}>Schedule an event</button>
        </Link>
        <Link to='/browse'>
        <button className="button is-large is-danger is-rounded" >Browse</button>
        </Link>
      </div>

      {/* Alert message for successfull event scheduling. */}
      <Collapse in={eventScheduled !== ""}>
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
          {eventScheduled}
        </Alert>
      </Collapse>
    </section>
  )
}

export default HomePage;
