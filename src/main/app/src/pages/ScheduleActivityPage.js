import React from 'react';
import $ from 'jquery';
import { Redirect } from 'react-router-dom';
import { MDBInput } from "mdbreact";
import Datetime from "react-datetime";
import { useStyles, custom } from '../hooks/useStyles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {Grid, Button, FormControlLabel, Switch, FormControl, 
        TextField, Chip, Radio, AccordionSummary, Accordion, AccordionDetails, Typography } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import swal from 'sweetalert';
import 'react-datetime/css/react-datetime.css';

/* Component for the schedule activity page.
  If the user isn't already logged in, they wil be redirected to
  the login page. */
const ScheduleActivityPage = ({isLoggedIn, accessToken, userId, activity, links, eventScheduled, updateEventScheduled, updateActivity , activityType}) => {

  // Event fields stored as component state.
  const [title, updateTitle] = React.useState("");
  const [startTime, updateStartTime] = React.useState(new Date());
  // Set end date 30mins ahead.
  const [endTime, updateEndTime] = React.useState(new Date(Date.now() + (60000 * 30)));
  const [guestChips, updateGuestChips] = React.useState([]);
  const [guest, updateGuest] = React.useState("");

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

  // Append new guest to guest chip list on submit.
  const handleGuestSubmit = () => {
    let chips = guestChips;
    chips.push({key: guestChips.length, label: guest});
    updateGuestChips(chips);
    updateGuest("");
  }

  const randomFunction = (testData) => {

    // arr that has all the indices at first, but then removes the indices thare taken into consideration.
    const arr = new Array();

    //populate the array elements as 0 to testData's length. 
    for (let i = 0; i < testData.length; i++) {
      arr.push(i);
    }

    // item1,2,3 are the random indices received
    // from arr i have gotten index item1.
    var item1 = arr[Math.floor(Math.random() * arr.length)];
    arr.splice(item1, 1);

    var item2 = arr[Math.floor(Math.random() * arr.length)];
    arr.splice(item2, 1);

    var item3 = arr[Math.floor(Math.random() * arr.length)];
    arr.splice(item3, 1);

    // add the elements from testData at these random indices and return them. 
    const randomArray = new Array();
    randomArray.push(testData[item1]);
    randomArray.push(testData[item2]);
    randomArray.push(testData[item3]);

    return (
    <div className="d-flex flex-row justify-content-center">
      {randomArray.map((element) => <Button key={element.key} onClick={() => { alertUpdateActivity(element) }} size ="large" color="secondary" variant="outlined" className="mx-1"> {element.title} </Button>)}
    </div>)
    
}

  const alertUpdateActivity = (element) => {
    updateActivity(element);
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
        <ul className={`${classes.chipsList} d-flex flex-row mt-2 mb-0`}>
          {guestChips.map(chip => 
            <li key={chip.key} className="d-inline-block">
              <Chip
                icon={<FaceIcon />}
                label={chip.label}
                onDelete={() => handleChipDelete(chip.key)}
              />
          </li>)}
        </ul> : null
      }
      {/* Form to add guests. */}
      <div className={classes.root}>
        <TextField label="Add Guest" variant="outlined" className={`${classes.input}`} 
          value={guest} onChange={handleGuestChange} style={custom.guestInput} />
        <Button variant="contained" color="primary" className={classes.button} onClick={handleGuestSubmit}>Add</Button>
      </div>

      {/* Display activity title if an activity was selected. */}
      {activity.title ?
        <div className={classes.root} className="w-100">
          <Accordion>
            <AccordionSummary 
              className={classes.summaryColor}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes .heading}>{activity.title}</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.typoColor}>
              <Typography>
               { activityType == "active" ? activity.creator : activityType == "reading" ? activity.description : activity.notes}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
     :
        randomFunction(links)
      }

      <div className={classes.root}>
      <Button variant="contained" color="primary" style={custom.largeButton} 
        onClick={handleSubmit}>Create Event</Button>
      </div>

    </div>

    
  )
}

export default ScheduleActivityPage;
