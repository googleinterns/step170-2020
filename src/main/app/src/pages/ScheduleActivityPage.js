import React from 'react';
import { MDBInput } from "mdbreact";
import Datetime from "react-datetime";
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Button, FormControlLabel,
  Switch, Paper, FormControl, TextField} from '@material-ui/core';

import 'react-datetime/css/react-datetime.css';

/* Component for the schedule activity page */
const ScheduleActivityPage = () => {
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
    }
  }));
  const classes = useStyles();

  return (
    <div className="container py-5">
      <h1 className="text-center">Schedule Activity</h1>
      {/* Title input */}
      <div className={classes.root}>
      <TextField id="standard-basic" label="Add Title" className={classes.input} />
      </div>
      {/* Datetime selection */}
      <div className="row py-5">
        <div className="col-6">
         <Datetime inputProps={{placeholder: 'Start Time'}} />
        </div>
        <div className="col-6">
         <Datetime inputProps={{placeholder: 'End Time'}} />
        </div>
      </div>
      {/* Switch to specify not repeating event. */}
      <FormControlLabel
        control={<Switch checked={false} onChange={() => {}} />}
        label="Does not Repeat"
        labelPlacement="start"
        className="m-0"
      />
      <div className={classes.root}>
        <TextField label="Add Guest" variant="outlined" className={`${classes.input} ${classes.guestInput}`} />
        <Button variant="contained" color="primary" className={classes.button}>Add</Button>
      </div>
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>Game</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>Game</Paper>
        </Grid>
      </Grid>
      <div className={classes.root}>
      <Button variant="contained" color="primary" className={classes.largeButton}>Create Event</Button>
      </div>
    </div>
  )
}

export default ScheduleActivityPage;
