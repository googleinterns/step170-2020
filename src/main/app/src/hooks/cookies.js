import Cookies from 'js-cookie';

const clearCookies = () => { // Clear all cookies except ones used for form fields
  const allCookies = getAllCookieNames();
  allCookies.forEach(name => !name.startsWith('!') ? Cookies.remove(name) : null); // Empty cookie and set it to expired timestamp
}

const clearFormCookies = () => {
  const allCookies = getAllCookieNames();
  allCookies.forEach(name => name.startsWith('!') ? Cookies.remove(name) : null); // Empty only form cookies
}

const getAllCookieNames = () => {
  return document.cookie.split('; ')
    .map(cookie => cookie.substring(0, cookie.indexOf('=')));
}

const getScheduleActivityCookies = () => {
  const formFields = ['title', 'guests', 'activity'];
  return formFields.reduce((fieldValues, field) => {
    fieldValues[field] = Cookies.get('!' + field);
    return fieldValues;
  }, {});
}

export {clearCookies, getScheduleActivityCookies, clearFormCookies}
