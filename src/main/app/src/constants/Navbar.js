import React from 'react';
import {GoogleLogin, GoogleLogout} from 'react-google-login';

import { handleLogin, handleLogout,
  handleLoginFail, handleLogoutFail } from '../hooks/authenticationHandlers';

import info from './keys.js';
import 'bulma/css/bulma.css';

/* Component for web app navigation bar */
const Navbar = ({isLoggedIn, updateIsLoggedIn, updateAccessToken, updateUserId, greeting, updateGreeting}) => {

  // Initialize google auth api information
  const clientID = info[0].clientID;
  const discoveryDocs = info[0].discoveryDocs;
  const scope = info[0].scope;

  return (
    <div>
    <nav className="navbar is-spaced is-dark" role="navigation" aria-label="main navigation"> 
      <div className="container">
        <div className="navbar-brand">
          <a className="navbar-item" href="/"> WeTime <i className="fas fa-heartbeat"></i></a>
          
          <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        {/*Navbar tabs to other pages.*/}
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item"><span className="icon"><i className="fas fa-question-circle"></i></span><span> Help </span></a>
            <a className="navbar-item"><span className="icon"><i className="fas fa-address-card"></i></span><span> About</span></a> 
          </div>
        </div>

        {/*The login and log out button. Changes according to signed in status. Handled in js just below.*/}
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
            {/* Display login or logout button depending on loggedIn status */}
            { !isLoggedIn ?
              <GoogleLogin
                clientId={clientID}
                render={renderProps => (
                  <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="button is-info" id="authorize_button">
                    <i className="fab fa-google fa-fw"></i>Login with Google
                  </button>
                )}
                onSuccess={res => handleLogin(res, updateIsLoggedIn, updateGreeting, updateAccessToken, updateUserId)}
                onFailure={res => handleLoginFail(res)}
                discoveryDocs={discoveryDocs}
                scope={scope}
                cookiePolicy={'single_host_origin'}
                isSignedIn = {true}    /* This makes sure the user is logged in across different pages of the webapp. */
              />
              :
              <GoogleLogout
                clientId={clientID}
                render={renderProps => (
                  <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="button is-primary" id="signout_button">
                    <i className="fas fa-sign-out-alt fa-fw"></i>Logout
                  </button>
                )}
                onLogoutSuccess={res => handleLogout(res, updateIsLoggedIn, updateGreeting, updateAccessToken, updateUserId)}
                onFailure={res => handleLogoutFail(res)}
                discoveryDocs={discoveryDocs}
                scope={scope}
                cookiePolicy={'single_host_origin'}
              /> }
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div className = "container">
      <span className="is-italic" style={{color: "grey",lineHeight: '3.5'}} > {greeting}</span>
    </div> 

    </div>
  )
}

export default Navbar;
