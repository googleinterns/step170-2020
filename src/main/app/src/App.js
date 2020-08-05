import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import Navbar from './constants/Navbar';
import Line from './constants/Line';
import ResourceCard from './constants/ResourceCard';
import info from './constants/keys.js';

/* Component for entire application */
class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <main style={{ marginTop: '0.5rem' }}>
          <Routes />
        </main>
      </Router>
    );
  }
}

export default App;
