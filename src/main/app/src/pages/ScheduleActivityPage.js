import React from 'react';
import $ from 'jquery';
import { Redirect } from 'react-router-dom';
import { MDBInput } from "mdbreact";
import Datetime from "react-datetime";
import { useStyles } from '../hooks/useStyles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Grid, Button, FormControlLabel, Switch, FormControl, 
        TextField, Chip, Radio, CardContent, CardActions, Card, Typography } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import swal from 'sweetalert';
import 'react-datetime/css/react-datetime.css';
import GameCard from '../constants/GameCard.js';
import ArticleCard from '../constants/ArticleCard.js';
import VideoCard from '../constants/VideoCard.js';

/* Component for the schedule activity page.
  If the user isn't already logged in, they wil be redirected to
  the login page. */
const ScheduleActivityPage = ({isLoggedIn, accessToken, userId, activity, links, eventScheduled, updateEventScheduled, updateActivity , activityType}) => {

  const randomActivityArray = generateRandomActivities(links);

  // Event fields stored as component state.
  const [title, updateTitle] = React.useState("");
  const [startTime, updateStartTime] = React.useState(new Date());
  const [endTime, updateEndTime] = React.useState(new Date());
  const [guestChips, updateGuestChips] = React.useState([]);
  const [guest, updateGuest] = React.useState("");

  // Get object for css classes.
  const classes = useStyles();

  const generateRandomActivities = (testData) => {

    // arr that has all the indices at first, but then removes the indices thare taken into consideration.
    // Populate the array elements as 0 to testData's length. 
    const arr = Array.from(Array(testData.length).keys());

    // randomArray is an array that will have any three random objects of testData. 
    const randomArray = new Array();

    // For loop to store three indices of testData into items array.
    for (let i = 0; i < 3; i++) {
      var x = Math.floor(Math.random() * arr.length);   // This is the randomly generated number from [0, (arr.length -1)]. 
      randomArray.push(testData[arr[x]]);    // Storing the objects directly from the testData.
      arr.splice(x,1);    // Remember! This deletes an element so the size will decrease by 1.
    }

    return (randomArray);
  }

  const alertUpdateActivity = (element) => {
    updateActivity({activityKey: element.key, title: element.title});
    swal({
      title: "You clicked "+ element.title + "!",
      text: "Setting your activity! Have fun! Press Create Event to continue",
      icon: "success",
      button: "Close",
    });
  }

  // Changes title state according to title textbox.
  const handleTitleChange = e => {
    updateTitle(e.target.value);
  }

  // Changes guest state according to guest textbox.
  const handleGuestChange = e => {
    updateGuest(e.target.value);
  }

  // Append new guest to guest chip list on submit.
  const handleGuestSubmit = () => {
    let chips = guestChips;
    chips.push({key: guestChips.length, label: guest});
    updateGuestChips(chips);
    updateGuest("");
  }

  // Remove guest specified key from guest chip list.
  const handleChipDelete = key => {
    let chips = guestChips.reduce((filtered, chip) => {
      if (chip.key < key) filtered.push(chip);
      else if (chip.key > key) filtered.push({key: filtered.length, label: chip.label});
      return filtered;
    }, []);
    updateGuestChips(chips);
  }

  // Retrieve all event information from state.
  const getEventInfo = () => {
    // Concatenate guest list into a single string
    const guestArray = guestChips.reduce((guests, guest) => {
      guests.push(guest.label);
      return guests;
    }, []);
    const guests = guestArray.join(",");

    return {
      userId: userId,
      accessToken: accessToken,
      title: title,
      startTimestamp: startTime.getTime(),
      endTimestamp: endTime.getTime(),
      activityKey: activity.activityKey,
      guests: guests
    }
  }

  const handleSubmit = () => {
    const eventInfo = getEventInfo();
    $.post('/createEvent', eventInfo)
      .done(eventUrl => {
        updateEventScheduled(eventUrl);
      })
  }

  return (
    !isLoggedIn ?
    <Redirect to="/login" /> :
    eventScheduled !== "" ?
    <Redirect to="/" /> :
    <div className="container py-5">
      <h1 className="text-center">Schedule Activity</h1>
      {/* Title input */}
      <div className={classes.root}>
      <TextField id="standard-basic" label="Add Title" className={classes.input} 
        value={title} onChange={handleTitleChange} />
      </div>
      {/* Datetime selection */}
      <div className="row py-5">
        <div className="col-6">
          <Datetime inputProps={{placeholder: 'Start Time'}} 
            value={startTime} onChange={moment => updateStartTime(moment.toDate())} />
        </div>
        <div className="col-6">
          <Datetime inputProps={{placeholder: 'End Time'}} 
            value={endTime} onChange={moment => updateEndTime(moment.toDate())}/>
        </div>
      </div>
      {/* Switch to specify not repeating event. */}
      <FormControlLabel
        control={<Switch checked={false} onChange={() => {}} />}
        label="Does not Repeat"
        labelPlacement="start"
        className="m-0"
      />
      {/* Chip list to display added guests. */}
      {guestChips.length > 0 ?
        <FormControl component="ul" className={classes.chipsList}>
          {guestChips.map(chip => 
            <li key={chip.key} className="d-inline-block">
              <Chip
                icon={<FaceIcon />}
                label={chip.label}
                onDelete={() => handleChipDelete(chip.key)}
              />
          </li>)}
        </FormControl> : null
      }
      {/* Form to add guests. */}
      <div className={classes.root}>
        <TextField label="Add Guest" variant="outlined" className={`${classes.input} ${classes.guestInput}`} 
          value={guest} onChange={handleGuestChange} />
        <Button variant="contained" color="primary" className={classes.button} onClick={handleGuestSubmit}>Add</Button>
      </div>

      {/* Display activity title if an activity was selected. */}
      {activity.title ?
        <div className={classes.root} className="container">
          <Card className={classes.root}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {activity.title}
              </Typography>
            </CardContent>
          </Card>
        </div>
     :
        <div className={classes.root} className="container">
          {generateRandomActivities(links).map((element, key) => {
            if (activityType === "games") {
              return (
                <div key={key}>
                  <GameCard data={element} onClickFunction={alertUpdateActivity} parameters={element} buttonText={"Choose this activity"}/>
                </div>
              );
            } else if (activityType === "reading") {
              return (
                <div key={key}>
                  <ArticleCard data={element} onClickFunction={alertUpdateActivity} parameters={element} buttonText={"Choose this activity"}/>
                </div>
              );
            } else if (activityType === "active") {
              return (
                <div key={key}>
                  <VideoCard data={element} onClickFunction={alertUpdateActivity} parameters={element} buttonText={"Choose this activity"}/>
                </div>
              );
            }
          })}
        </div>     
      }

      <div className={classes.root}>
      <Button variant="contained" color="primary" className={classes.largeButton} 
        onClick={handleSubmit}>Create Event</Button>
      </div>

    </div>
  )
}

export default ScheduleActivityPage;
