// Handle successful login
const handleLogin = (res, updateIsLoggedIn, updateGreeting, updateAccessToken, updateUserId, updateUserEmail) => {
  updateIsLoggedIn(true);
  updateAccessToken(res.accessToken);
  updateUserId(res.Da);
  updateUserEmail(res.profileObj.email);
  updateGreeting("Welcome " + res.profileObj.name +"!");
}

// Handle successful logout
const handleLogout = (res, updateIsLoggedIn, updateGreeting, updateAccessToken, updateUserId, updateUserEmail) => {
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
