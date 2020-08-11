import React from 'react';
import ScheduleActivityPage from '../pages/ScheduleActivityPage';

/** This is a wrapper component for the schedule activity page.
    It holds the state of the random activities generated to prevent
    unnecessary rerenderes. */
const ScheduleActivityWrapper = props => {
  const [randomActivities, updateRandomActivities] = React.useState([]);
  return (
    <ScheduleActivityPage {...props} />
  )
}

export default ScheduleActivityWrapper;
