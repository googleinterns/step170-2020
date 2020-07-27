import React from 'react';
import { MDBInput } from "mdbreact";
import Datetime from 'react-datetime'

import 'react-datetime/css/react-datetime.css';

const ScheduleActivityPage = () => {
  console.log("Activity scheduling page has been loaded.");
  
  return (
    <div className="container py-5">
      <h1 className="text-center">Schedule Activity</h1>
      <MDBInput label="Add Title" size="lg" />
      <br />
      <div className="row">
        <div className="col-6">
         <Datetime inputProps={{placeholder: 'Start Time'}} />
        </div>
        <div className="col-6">
         <Datetime inputProps={{placeholder: 'End Time'}} />
        </div>
      </div>
      <br />
      <button className="btn btn-outline-primary">Does not Repeat</button>
    </div>
  )
}

export default ScheduleActivityPage;