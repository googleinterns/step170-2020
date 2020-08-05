import React, { useState, useEffect } from 'react';
import '../css/home.css';

import info from '../constants/keys.js';

// Import Bootstrap CSS and JS. Only this page uses these. 
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

// This is a stateless, functional React component used to render each resource in a card format. 
const ResourceCard = ({ organization, description, url }) => (
  <div className = "p-3">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title text-info">{organization}</h5>
        <p className="card-text text-secondary" >{description}</p>
        <a className="card-text btn btn-light" href={url}>View more</a>
      </div>
    </div>
  </div>
);

/* Component for home page */
const HelpPage = () => {

  const [resources, updateResources] = React.useState([]);
  useEffect(() => {
    fetch(info[0].Airtable_URL)
    .then((resp) => resp.json())
    .then(data => {
       updateResources(data.records);
    }).catch(err => {
      console.log("ERROR: Couldn't fetch data from airtable!");
    });
  },[]); // Added [] means that this function useEffect() is called only when this component loads.
  
  // Create a map to all the resources in the airtable to its fields and display them in Resource card format. 
  return (
    <section className = "section">
      <div className="container mt-1 w-auto p-3">
        <div className="row"> 
          <div> {resources.map(resource => <ResourceCard key={resource.fields.url} {...resource.fields} /> )}  </div> 
        </div>
      </div>
    </section>
  ); 
}

export default HelpPage;
