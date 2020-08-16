import React from 'react';
import {shallow} from 'enzyme';
import ScheduleActivityPage from './ScheduleActivityPage';
import { TextField } from '@material-ui/core';

/** Initialize test props for the schedule activity page. */
const props = {
  isLoggedIn: true,
  accessToken: "",
  userId: "",
  activity: {},
  links: [],
  eventScheduled: "", 
  updateEventScheduled: () => {},
  updateActivity: () => {},
  activityType: "games",
  isGuest: false,
  randomActivities: [],
  updateRandomActivities: () => {}
}

/** Test form validation */

test('Check title error shown when form submitted with an empty title', () => {
  // Create mock of SchduleActivityPage
  const scheduleActivityPage = shallow(<ScheduleActivityPage {...props} />);

  // Submit form without setting title
  scheduleActivityPage.find('#submit-btn').simulate('click');

  // Check for invalid title error
  expect(scheduleActivityPage.childAt(0).text()).toEqual('ErrorInvalid title. — check it out!');
});
