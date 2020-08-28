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
import GameCard from '../constants/GameCard.js';
import ArticleCard from '../constants/ArticleCard.js';
import VideoCard from '../constants/VideoCard.js';
import LoadingIndicator from '../constants/LoadingIndicator';
import {palette, borders } from '@material-ui/system';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import blueGrey from '@material-ui/core/colors/blueGrey';

/* Component for the schedule activity page.
  If the user isn't already logged in, they wil be redirected to
  the login page. */
const ScheduleActivityPage = props => {
  const { isLoggedIn, accessToken, userId, activity, links, eventScheduled,
        updateEventScheduled, updateActivity , activityType, isGuest,
        randomActivities, updateRandomActivities, userEmail } = props;

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
  const [servletError, updateServletError] = React.useState(false);
  const [displayErrors, updateDisplayErrors] = React.useState(false);

  // Error messages
  const errors = [
    {error: titleError, errorMsg: "Invalid title."},
    {error: dateError, errorMsg: "Start time cannot be after end time."},
    {error: guestError, errorMsg: "Invalid email address for guest."},
    {error: servletError, errorMsg: "An error occured on our servers. Please try again in a few minutes."}
  ];

  const [loading, updateLoading] = React.useState(false);

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

  const generateRandomActivities = links => {

    // Prevent random Activities from reloading if already set
    if (randomActivities.length !== 0) {
      return randomActivities;
    }

    // arr that has all the indices at first, but then removes the indices thare taken into consideration.
    // Populate the array elements as 0 to testData's length.
    const arr = Array.from(Array(links.length).keys());

    // randomArray is an array that will have any three random objects of testData.
    const randomArray = new Array();

    // For loop to store three indices of testData into items array.
    for (let i = 0; i < 3; i++) {
      var x = Math.floor(Math.random() * arr.length);   // This is the randomly generated number from [0, (arr.length -1)].
      randomArray.push(links[arr[x]]);    // Storing the objects directly from the testData.
      arr.splice(x,1);    // Remember! This deletes an element so the size will decrease by 1.
    }

    updateRandomActivities(randomArray);
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
    // Add user's email to guest list.
    guestArray.push(userEmail);
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

  function refreshPage() {
    window.location.reload(false);
  }

  const handleSubmit = () => {
    if (!validate(title, startTime, endTime, updateTitleError, updateDateError)) { // no errors
      if (isGuest) {
        updateLoading(true);
        setTimeout(() => { // simulate form submittion.
          updateEventScheduled(window.location.origin);
          updateLoading(false);
        }, 2000);

      } else {
        updateLoading(true);
        const eventInfo = getEventInfo();
        $.post('/createEvent', eventInfo)
        .done(eventUrl => {
          updateEventScheduled(eventUrl);
        })
        .fail(() => {
          // Stop loading and display error message if request failed.
          updateLoading(false);
          updateDisplayErrors(true);
          updateServletError(true);
        });
      }
    } else {
      updateDisplayErrors(true);
    }
  }

  return (
    !isLoggedIn && !isGuest ?
    <Redirect to="/login" /> :
    eventScheduled !== "" ?
    <Redirect to="/" /> :
    <div className="container pb-5">
      {/* Guest mode warning and disclaimer. */}

      {isGuest ?
        <Alert severity="warning" className="mb-5">
          {"You are currently using guest mode. An event will"} <strong>NOT</strong> {"be added to your calendar on submittion of this form."}
        </Alert> : null
      }
      {/* Alert errors if any. */}
      {displayErrors && (titleError || dateError || servletError) ?
        <Alert severity="error" onClose={() => updateDisplayErrors(false)} className="mb-5">
          <AlertTitle>Error</AlertTitle>
          {errors.map((errorObj, key) =>
              errorObj.error ? <div key={key}>{errorObj.errorMsg}</div> : null
          )}
        </Alert> : null}

      <section className="section">
        <h1 className="text-center">Schedule Activity</h1>

        {/* Title input */}
        <div className={classes.root}>
        <TextField id="title-field" label="Add Title" className={classes.input}
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
          <TextField label="Add Guest Email" variant="outlined" style={custom.guestInput} className="flex-grow-1"
            value={guest} onChange={handleGuestChange} error={guestError} />
          <Button variant="contained" color="primary" className={classes.button} onClick={handleGuestSubmit}>Add</Button>
        </div>

        {/* Display activity title if an activity was selected. */}
        {activity.title ?
          <div className={classes.root} className="container mt-5">
            <Card className={`${classes.root} mt-3`}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {activity.title}
                </Typography>
              </CardContent>
            </Card>
          </div>
      :
          <Box borderRadius={16} bgcolor={blueGrey[50]} className={classes.root} className="container mt-6">
            <div className="p-4 uiTypography-root MuiTypography-h5 MuiTypography-gutterBottom">
              <h3> <i class="fas fa-check-circle"></i> Choose one of the {activityType} listed below: </h3>
            </div>

            {generateRandomActivities(links).map((element, key) => {
              return (
                <div key={key}>
                  {activityType === "games" ?
                    <GameCard data={element} updateScheduleActivity={alertUpdateActivity} parameters={element} buttonText={"Choose this activity"}/> :
                    activityType === "reading" ?
                    <ArticleCard data={element} updateScheduleActivity={alertUpdateActivity} parameters={element} buttonText={"Choose this activity"}/> :
                    <VideoCard data={element} updateScheduleActivity={alertUpdateActivity} parameters={element} buttonText={"Choose this activity"}/> }
                </div>
              )
            })}

            <div class="m-3 p-2 buttons has-addons is-right">
              <button value="schedule" className="button is-info mx-2" onClick={() => updateRandomActivities([])}>Generate 3 new {activityType}</button>
              <Link to='/browse'>
                <button value="browse" className="button is-primary mx-2" >Browse more {activityType}</button>
              </Link>
            </div>
          </Box>
        }

        <div className={classes.root}>
          <Button id="submit-btn" variant="contained" color="primary" style={custom.largeButton} onClick={handleSubmit} disabled={activity.title ? false : true}>
            Create Event
          </Button>
        </div>

        {/** Show loading indicator once user presses the form submit button. */}
        {loading ? <LoadingIndicator /> : null}

      </section>
    </div>
  )
}

export default ScheduleActivityPage;
