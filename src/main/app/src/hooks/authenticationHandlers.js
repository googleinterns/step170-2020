// Handle successful login
const handleLogin = (res, updateIsLoggedIn, updateGreeting, updateAccessToken, updateUserId) => {
  updateIsLoggedIn(true);
  updateAccessToken(res.accessToken);
  updateUserId(res.Da);
  updateGreeting("Welcome " + res.profileObj.name +"!");
}

// Handle successful logout
const handleLogout = (res, updateIsLoggedIn, updateGreeting, updateAccessToken, updateUserId) => {
  updateIsLoggedIn(false);
  updateGreeting("Welcome!");
  updateAccessToken("");
  updateUserId("");
}

// Handle failed login
const handleLoginFail = (res) => { console.log('err', res) }

// Handle failed logout
const handleLogoutFail = (res) => { console.log('err', res) }

export {
  handleLogin,
  handleLogout,
  handleLoginFail,
  handleLogoutFail
}
