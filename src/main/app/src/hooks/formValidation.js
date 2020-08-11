/** This react hook contains functions used to validate event information entered on the
    schedule activity page. */

const isValidEmail = email => {
  const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return re.test(email);
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
