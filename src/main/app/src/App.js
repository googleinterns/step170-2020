import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import Navbar from './constants/Navbar';
import Line from './constants/Line';
import ResourceCard from './constants/ResourceCard';
import info from './constants/keys.js';
import './css/app.css';

/* Component for entire application */
const App = () => {
    
  const [isLoggedIn, updateIsLoggedIn] = React.useState(false);
  const [accessToken, updateAccessToken] = React.useState("");
  const [userId, updateUserId] = React.useState("");
  const [activity, updateActivity] = React.useState("games");


  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} updateIsLoggedIn={updateIsLoggedIn} updateAccessToken={updateAccessToken} updateUserId={updateUserId} />
      <main style={{ marginTop: '0.5rem' }}>
        <Routes activity={activity} updateActivity={updateActivity}/>
      </main>
    </Router>
  );
}

export default App;
