import React, { Component } from 'react';
import 'bulma/css/bulma.css';
import '../css/home.css';

// Import Bootstrap CSS and JS. Only this page uses these. 
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

/* Component for home page */
class HelpPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      resources: [],
    };
  }

  /* This is a lifecycle method of the class component. The code inside it is run whenever a component is ready to be loaded onto the page. */
  componentDidMount() {
    fetch('https://api.airtable.com/v0/appun5As9N6CFqu4H/Resources?api_key=keyvEcGAXuzDAVmVb')
    .then((resp) => resp.json())
    .then(data => {
       this.setState({ resources: data.records });
    }).catch(err => {
      // Error :(
    });
  }

  render() {
    return (
      <section class = "section">
        <div className="container mt-5 w-auto p-3">
          <div className="row"> 
            <div className="col">
              <div className="card-deck ">
                {this.state.resources.map(resource => <ResourceCard {...resource.fields} /> )}
              </div>
            </div>
          </div>
        </div>
      </section>
  );
  }
}

export default HelpPage;

// This is a stateless, functional React component. 
const ResourceCard = ({ organization, description, url }) => (
  <div className="card">
    <div className="card-body">
      <h5 className="card-title text-info">{organization}</h5>
      <p className="card-text text-secondary" >{description}</p>
      <a className="card-text btn btn-light" href={url}>View more</a>
      
    </div>
  </div>
);

