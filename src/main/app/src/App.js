import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import Navbar from './constants/Navbar';
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
