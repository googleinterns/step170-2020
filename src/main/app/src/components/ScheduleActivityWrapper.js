import React from 'react';
import ScheduleActivityPage from '../pages/ScheduleActivityPage';

/** This is a wrapper component for the schedule activity page.
    It holds the state of the random activities generated to prevent
    unnecessary rerenderes. */
const ScheduleActivityWrapper = props => {
  // Todo: Move randomActivities state from the schedule activity page to here.
  const [randomActivities, updateRandomActivities] = React.useState([]);
  return (
    <ScheduleActivityPage {...props} randomActivities={randomActivities}
      updateRandomActivities={updateRandomActivities} />
  )
}

export default ScheduleActivityWrapper;
