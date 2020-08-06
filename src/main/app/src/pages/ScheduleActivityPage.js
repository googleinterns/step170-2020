import React from 'react';
import { Redirect } from 'react-router-dom';
import { MDBInput } from "mdbreact";
import Datetime from "react-datetime";
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Button, FormControlLabel,
  Switch, Paper, FormControl, TextField, Chip} from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';

import 'react-datetime/css/react-datetime.css';

/** CSS styles for material ui components. */
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    width: '100%',
    paddingTop: '1.8rem',
    paddingBottom: '1.8rem',
    margin: 0
  },
  gridItem: {
    padding: 0
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  input: {
    flex: 1
  },
  guestInput: {
    paddingRight: '1rem'
  },
  button: {paddingLeft: '1rem'},
  largeButton: {
    padding: '1rem 2rem',
    margin: '0px auto',
    fontSize: '1.1rem'
  },
  chipsList: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    '& > *': {
      margin: theme.spacing(0.5)
    }
  }
}));

const Activities_list = {
  
    "activity1":"Coup",
    "activity2":"pictionary",
    "activity3":"Skribble",

  };

/* Component for the schedule activity page.
  If the user isn't already logged in, they wil be redirected to
  the login page. */
const ScheduleActivityPage = ({isLoggedIn, accessToken, userId, activity}) => {

  // Event fields stored as component state.
  const [title, updateTitle] = React.useState("");
  const [startTime, updateStartTime] = React.useState(new Date());
  const [endTime, updateEndTime] = React.useState(new Date());
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
    const guestArray = guestChips.reduce((guests, guest) => {
      guests.push(guest.label);
      return guests;
    }, []);
    const guests = guestArray.join(",");

    return {
      userId: userId,
      accessToken: accessToken,
      title: title,
      startTime: startTime.getTime(),
      endTime: endTime.getTime(),
      guests: guests
    }
  }

  const handleSubmit = () => {}

  return (
    !isLoggedIn ?
    <Redirect to="/login" /> :
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

      {/* Random game suggestions. */}

      {console.log(activity)}

      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>{Activities_list.activity1}</Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>{Activities_list.activity2}</Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>{Activities_list.activity3}</Paper>
        </Grid>
      </Grid>

      <div className={classes.root}>
      <Button variant="contained" color="primary" className={classes.largeButton} 
        onClick={handleSubmit}>Create Event</Button>
      </div>

    </div>

    
  )
}

export default ScheduleActivityPage;
