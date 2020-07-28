import React from 'react';
import { MDBInput } from "mdbreact";
import Datetime from "react-datetime";

import 'react-datetime/css/react-datetime.css';

/* Component for the schedule activity page */
const ScheduleActivityPage = () => {
  return (
    <div className="container py-5">
      <h1 className="text-center">Schedule Activity</h1>
      {/* Title input */}
      <MDBInput label="Add Title" size="lg" />
      <br />
      {/* Datetime selection */}
      <div className="row">
        <div className="col-6">
         <Datetime inputProps={{placeholder: 'Start Time'}} />
        </div>
        <div className="col-6">
         <Datetime inputProps={{placeholder: 'End Time'}} />
        </div>
      </div>
      <br />
      {/* Button to specify not repeating event. */}
      <button className="btn btn-outline-primary">Does not Repeat</button>
    </div>
  )
}

export default ScheduleActivityPage;
