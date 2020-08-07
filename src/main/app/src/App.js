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
    
  const [isLoggedIn, updateIsLoggedIn] = React.useState(false);
  const [accessToken, updateAccessToken] = React.useState("");
  const [userId, updateUserId] = React.useState("");
  const [activity, updateActivity] = React.useState("games");
  const [links, updateLinks] = React.useState([]);

  React.useEffect(() => {
    updateActivityLinks(updateLinks,
      activity == "active" ? videoData : activity == "reading" ? articleData : gameData);
  },[activity]);
  
  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} updateIsLoggedIn={updateIsLoggedIn} updateAccessToken={updateAccessToken} updateUserId={updateUserId} />
      <main style={{ marginTop: '0.5rem' }}>
        <Routes activity={activity} updateActivity={updateActivity} links={links} />
      </main>
    </Router>
  );
}

export default App;
