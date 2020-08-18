/** This react hook contains functions used to validate event information entered on the
    schedule activity page. */

const isValidEmail = email => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
}

const validate = (title, startTime, endTime, updateTitleError, updateDateError) => {
  let errors = false;

  // validate title
  if (title === "") {
    updateTitleError(true);
    errors = true;
  }

  // validate times
  if (startTime.getTime() > endTime.getTime()) {
    updateDateError(true);
    errors = true;
  }

  return errors;
}

export { isValidEmail, validate }
