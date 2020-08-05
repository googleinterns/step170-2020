import React from 'react';

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

export default ResourceCard;
