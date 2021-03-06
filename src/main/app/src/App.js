import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import Navbar from './constants/Navbar';
import Line from './constants/Line';
import ResourceCard from './constants/ResourceCard';
import info from './constants/keys.js';
import './css/app.css';
import Cookies from 'js-cookie';

import updateActivityLinks from './hooks/updateActivityLinks';
import {clearCookies} from './hooks/cookies';

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
  const [userEmail, updateUserEmail] = React.useState("");

  // State for activity selection and data
  const [activityType, updateActivityType] = React.useState("games");
  // For activity type enumeration.
  const activityTypes = {
    GAMES: 'games',
    ARTICLES: 'articles',
    VIDEOS: 'videos'
  }
  const [servlet, updateServlet] = React.useState(gameData);

  // State for activities data retrieved from servlet
  const [links, updateLinks] = React.useState([]);
  const [linksLoaded, updateLinksLoaded] = React.useState(false);

  // State for schedule activity form submitted.
  const [eventScheduled, updateEventScheduled] = React.useState("");

  // Guest sign in
  const [isGuest, updateIsGuest] = React.useState(false);

  // Populate links array with default serlet.
  if (!linksLoaded) {
    updateActivityLinks(updateLinks, servlet);
    updateLinksLoaded(true);
  }

  // State for welcome message depending on login status
  const [greeting, updateGreeting] = React.useState("Welcome!");

  // State for activity selected (this can be the three random activities or the activity that the user selected on the browse page)
  const [activity, updateActivity] = React.useState({});

  const [cookiesCleared, updateCookiesCleared] = React.useState(false);

  if (!cookiesCleared) { // Clear cookies only once on site visit.
    clearCookies();
    updateCookiesCleared(true);
  }

  // Fetches data from web servlet right when the user opens the app.
  React.useEffect(() => {
    updateActivityLinks(updateLinks, servlet);
  },[activityType]);    // Adding [activityType] makes sure that the links are updated only as long as the activityType changes.

  // Guest sigin in.
  React.useEffect(() => {
    if (isGuest) {
      updateGreeting("Welcome Guest!");
    }
  },[isGuest]);

  React.useEffect(() => {
    Cookies.set('!activity', JSON.stringify(activity)); // Store selected activity in cookie
  },[activity]);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} updateIsLoggedIn={updateIsLoggedIn} updateAccessToken={updateAccessToken} updateUserId={updateUserId}
        greeting={greeting} updateGreeting={updateGreeting} updateUserEmail={updateUserEmail} updateIsGuest={updateIsGuest} />
      <main style={{ marginTop: '0.5rem' }}>
        <Routes activityType={activityType} updateActivityType={updateActivityType} activity={activity} updateActivity={updateActivity} updateServlet={updateServlet} links={links} isLoggedIn={isLoggedIn}
          updateIsLoggedIn={updateIsLoggedIn} accessToken={accessToken} updateAccessToken={updateAccessToken} userId={userId}
          updateUserId={updateUserId} greeting={greeting} updateGreeting={updateGreeting} articleData={articleData} videoData={videoData} gameData={gameData} eventScheduled={eventScheduled}
          updateEventScheduled={updateEventScheduled} isGuest={isGuest} updateIsGuest={updateIsGuest} activityTypes={activityTypes} userEmail={userEmail} updateUserEmail={updateUserEmail} />
      </main>
    </Router>
  );
}

export default App;
