import React from 'react';
import {shallow} from 'enzyme';
import ScheduleActivityPage from './ScheduleActivityPage';
import { isValidEmail, validate } from '../hooks/formValidation';

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

test('Check date error shown when start time ahead of end time', () => {
  // Initialize start time ahead of end time
  const endTime = new Date();
  const startTime = new Date(endTime.getTime() + 1);

  // Validate with valid title but invalid dates
  const errors = validate("title", startTime, endTime, () => {}, () => {});

  // Check if date error
  expect(errors).toEqual(true);
});

test('Check email validation', () => {
  // Initialize invalid emails
  const invalidEmails = ["plainaddress", "#@%^%#$@#$@#.com", "@example.com",
    "Joe Smith <email@example.com>", "email.example.com", "email@example@example.com",
    ".email@example.com", "email.@example.com", "email..email@example.com",
    "email@example.com (Joe Smith)", "email@example", "email@111.222.333.44444",
    "email@example..com", "Abc..123@example.com"];

  // Initialize valid emails
  const validEmails = ["email@example.com", "firstname.lastname@example.com",
    "email@subdomain.example.com", "firstname+lastname@example.com",
    "\"email\"@example.com","1234567890@example.com", "email@example-one.com", 
    "_______@example.com", "email@example.name", "email@example.museum", 
    "email@example.co.jp", "firstname-lastname@example.com"];

  // Check all invalid emails
  for (const email of invalidEmails) {
    expect(isValidEmail(email)).toEqual(false);
  }

  // Check all valid emails
  for (const email of validEmails) {
    expect(isValidEmail(email)).toEqual(true);
  }
});
