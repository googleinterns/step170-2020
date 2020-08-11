import React from 'react';
import $ from 'jquery';
import { Redirect } from 'react-router-dom';
import { MDBInput } from "mdbreact";
import Datetime from "react-datetime";
import { useStyles, custom } from '../hooks/useStyles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { isValidEmail, validate } from '../hooks/formValidation';

import {Grid, Button, FormControlLabel, Switch, FormControl, 
        TextField, Chip, Radio, CardContent, CardActions, Card, Typography } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import FaceIcon from '@material-ui/icons/Face';
import swal from 'sweetalert';
import 'react-datetime/css/react-datetime.css';

/* Component for the schedule activity page.
  If the user isn't already logged in, they wil be redirected to
  the login page. */
const ScheduleActivityPage = props => {
  const {isLoggedIn, accessToken, userId, activity, links, eventScheduled, 
        updateEventScheduled, updateActivity , activityType, isGuest} = props;
  
  // Event fields stored as component state.
  const [title, updateTitle] = React.useState("");
  const [startTime, updateStartTime] = React.useState(new Date());
  const [endTime, updateEndTime] = React.useState(new Date(Date.now() + (60000 * 30))); // Set end date 30mins ahead.
  const [guestChips, updateGuestChips] = React.useState([]);
  const [guest, updateGuest] = React.useState("");

  // Form errors
  const [titleError, updateTitleError] = React.useState(false);
  const [dateError, updateDateError] = React.useState(false);
  const [guestError, updateGuestError] = React.useState(false);
  const [displayErrors, updateDisplayErrors] = React.useState(false);

  // Error messages
  const errors = [
    {error: titleError, errorMsg: "Invalid title."},
    {error: dateError, errorMsg: "Start time cannot be after end time."},
    {error: guestError, errorMsg: "Invalid email address for guest."}
  ];

  // Get object for css classes.
  const classes = useStyles();

  // Changes title state according to title textbox.
  const handleTitleChange = e => {
    updateTitle(e.target.value);
  }

  // Changes guest state according to guest textbox.
  const handleGuestChange = e => {
    updateGuest(e.target.value);
  }

  // Append new guest to guest chip list on add.
  const handleGuestSubmit = () => {
    if (isValidEmail(guest.toLowerCase())) {
      let chips = guestChips;
      chips.push({key: guestChips.length, label: guest.toLowerCase()}); // push guest unto chip list
      updateGuestChips(chips); // update chip list
      updateGuest(""); // reset guest
      updateGuestError(false); // reset guest error
    } else {
      updateGuestError(true);
    }
  }

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

    return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {randomArray.map((element) => 
          <Grid item xs>
            <Card className={classes.root}>

              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  {element.category}
                </Typography>
                <Typography variant="h6" component="h3">
                  {element.title}
                </Typography>
                <Typography variant="body2" component="p">
                  {activityType == "active" ? element.creator: activityType == "reading" ? element.description : element.notes}
                </Typography>
              </CardContent>

              <CardActions>
              <div>
                <Button key={element.key} size="small" variant="contained" color="primary" href={element.url}> VIEW MORE </Button>
                <Button key={element.key} size="small" color="secondary" variant="contained" onClick={() => { alertUpdateActivity(element) }}> Choose this activity</Button>
              </div>
              </CardActions>

            </Card>
          </Grid>
        )}
      </Grid>
    </div>
    )
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
    if (!validate(title, startTime, endTime, updateTitleError, updateDateError)) { // no errors
      if (isGuest) {
        updateEventScheduled(window.location.origin);
      } else {
        const eventInfo = getEventInfo();
        $.post('/createEvent', eventInfo)
        .done(eventUrl => {
          updateEventScheduled(eventUrl);
        });
      }
    } else {
      updateDisplayErrors(true);
    }
  }

  return (
    !isLoggedIn ?
    <Redirect to="/login" /> :
    eventScheduled !== "" ?
    <Redirect to="/" /> :
    <div className="container pb-5">
      {/* Alert errors if any. */}
      {displayErrors && (titleError || dateError) ? 
        <Alert severity="error" onClose={() => updateDisplayErrors(false)} className="mb-5">
          <AlertTitle>Error</AlertTitle>
          {errors.map(errorObj =>
              errorObj.error ? <div>{errorObj.errorMsg} — <strong>check it out!</strong></div> : null
          )}
        </Alert> : null}
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
        <ul className={`${classes.chipsList} d-flex flex-row mt-2 mb-3`}>
          {guestChips.map(chip => {
              const label = chip.label;
              return (
                <li key={chip.key} className="d-inline-block">
                  <Chip
                    icon={<FaceIcon />}
                    label={label.includes('@google.com') ? label.substring(0, label.length-10) : label}
                    onDelete={() => handleChipDelete(chip.key)}
                  />
                </li>
              )
            }
          )}
        </ul> : null
      }
      {/* Form to add guests. */}
      <div className="d-flex flex-row">
        <TextField label="Add Guest" variant="outlined" style={custom.guestInput} className="flex-grow-1"
          value={guest} onChange={handleGuestChange} error={guestError} />
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
        generateRandomActivities(links)
      }

      <div className={classes.root}>
        <Button variant="contained" color="primary" style={custom.largeButton} onClick={handleSubmit} disabled={activity.title ? false : true}>
          Create Event
        </Button>
      </div>

    </div>
  )
}

export default ScheduleActivityPage;
