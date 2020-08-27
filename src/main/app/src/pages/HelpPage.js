import React, { useState, useEffect } from 'react';
import '../css/home.css';

import info from '../constants/keys.js';

// Import Bootstrap CSS and JS. Only this page uses these. 
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import ResourceCard from '../constants/ResourceCard';

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
    
      <div className="container">
        <div className="row"> 
          <div> {resources.map(resource => <ResourceCard key={resource.fields.url} {...resource.fields} /> )}  </div> 
        </div>
      </div>
  ); 
}

export default HelpPage;
