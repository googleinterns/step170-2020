// Handle successful login
const handleLogin = (res, updateIsLoggedIn, updateGreeting, updateAccessToken, updateUserId) => {
  updateIsLoggedIn(true);
  updateGreeting("Welcome " + res.Ot.Cd +"!");
  updateAccessToken(res.accessToken);
  updateUserId(res.Da);
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
