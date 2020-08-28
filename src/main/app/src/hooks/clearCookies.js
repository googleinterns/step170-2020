import Cookies from 'js-cookie';

export default function clearCookies() { // Clear all cookies
  const allCookies = getAllCookieNames();
  allCookies.forEach(name => Cookies.remove(name)); // Empty cookie and set it to expired timestamp
}

const getAllCookieNames = () => {
  return document.cookie.split('; ')
    .map(cookie => cookie.substring(0, cookie.indexOf('=')));
}
