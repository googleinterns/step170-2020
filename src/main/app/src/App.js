import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import Navbar from './constants/Navbar';
import Line from './constants/Line';
import ResourceCard from './constants/ResourceCard';
import info from './constants/keys.js';
import './css/app.css';

import updateActivityLinks from './hooks/updateActivityLinks';

// Web Servlet links.
const articleData = './articleData';
const videoData = './videoData';
const gameData = './gameData';

/* Component for entire application */
const App = () => {
  
  // State for login/logout status
  const [isLoggedIn, updateIsLoggedIn] = React.useState(false);

  // State for google auth credentials.
  const [accessToken, updateAccessToken] = React.useState("");
  const [userId, updateUserId] = React.useState("");

  // State for activity selection and data
  const [activity, updateActivity] = React.useState("games");
  const [servlet, updateServlet] = React.useState(gameData); 
  const [links, updateLinks] = React.useState([]);

  // State for welcome message depending on login status
  const [greeting, updateGreeting] = React.useState("Welcome!");

  // Populate links array with default serlet.
  updateActivityLinks(updateLinks, servlet);

  // Fetches data from web servlet right when the user opens the app.
  React.useEffect(() => {
    updateActivityLinks(updateLinks, servlet);
  },[activity]);    // Adding [activity] makes sure that the links are updated only as long as the activity changes.
  
  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} updateIsLoggedIn={updateIsLoggedIn} updateAccessToken={updateAccessToken} updateUserId={updateUserId} 
        greeting={greeting} updateGreeting={updateGreeting} />
      <main style={{ marginTop: '0.5rem' }}>
        <Routes activity={activity} updateActivity={updateActivity} updateServlet={updateServlet} links={links} isLoggedIn={isLoggedIn} 
          updateIsLoggedIn={updateIsLoggedIn} accessToken={accessToken} updateAccessToken={updateAccessToken} userId={userId} 
          updateUserId={updateUserId} greeting={greeting} updateGreeting={updateGreeting} />
      </main>
    </Router>
  );
}

export default App;
