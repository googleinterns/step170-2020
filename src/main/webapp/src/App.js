import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ReactComponent as Logo } from './assets/logo.svg';
import Routes from './Routes';
import Navbar from './constants/Navbar';

/* Component for entire application */
class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <main style={{ marginTop: '4rem' }}>
          <Routes />
        </main>
      </Router>
    );
  }
}

export default App;
