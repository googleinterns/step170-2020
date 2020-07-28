import React from 'react';
import $ from "jquery";

import 'bulma/css/bulma.css';
import '../css/home.css';

import Navbar from '../components/Navbar';

const HomePage = () => {
  return (
    <section className="section">
      <div className="container">
        <Navbar />
      </div>
    </section>
  )
}

export default HomePage;