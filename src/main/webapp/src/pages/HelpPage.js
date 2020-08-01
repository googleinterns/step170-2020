import React, { useState, useEffect } from 'react';
import '../css/home.css';

// Import Bootstrap CSS and JS. Only this page uses these. 
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

// This is a stateless, functional React component. 
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
// class HelpPage extends Component {
const HelpPage = () => {

  const [resources, updateResources] = React.useState([]);

  useEffect(() => {
    fetch('https://api.airtable.com/v0/appun5As9N6CFqu4H/Resources?api_key=keyvEcGAXuzDAVmVb')
    .then((resp) => resp.json())
    .then(data => {
       updateResources(data.records);
    }).catch(err => {
      // Error :(
    });
  },[]); // Added [] means that this function useEffect() is called only when this component loads.
  
  return (
      <section className = "section">
        <div className="container mt-1 w-auto p-3">
          <div className="row"> 
            <div> {resources.map(resource => <ResourceCard {...resource.fields} /> )}  </div> 
          </div>
        </div>
      </section>
  ); 
}

export default HelpPage;
