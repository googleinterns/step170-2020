import React from 'react';
import { Redirect } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login'
import {Button} from '@material-ui/core';

import { handleLogin, handleLogout,
  handleLoginFail, handleLogoutFail } from '../hooks/authenticationHandlers';
import info from '../constants/keys';

/** Displayed before the Schedule Activity Page if the user is not logged in already. */
const LoginPage = ({isLoggedIn, updateIsLoggedIn, updateAccessToken, updateUserId, greeting, updateGreeting, updateIsGuest, updateUserEmail}) => {

  // Initialize google auth api information
  const clientID = info[0].clientID;
  const discoveryDocs = info[0].discoveryDocs;
  const scope = info[0].scope;

  return (
    isLoggedIn ?
    <Redirect to="/schedule-activity" /> :
    <div className="d-flex justify-content-center flex-column align-items-center">
      <GoogleLogin
        clientId={clientID}
        render={renderProps => (
          <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="button is-info p-4 mt-5 mx-auto" id="authorize_button">
            <i className="fab fa-google fa-fw"></i>Login with Google
          </button>
        )}
        onSuccess={res => handleLogin(res, updateIsLoggedIn, updateGreeting, updateAccessToken, updateUserId, updateUserEmail)}
        onFailure={res => handleLoginFail(res)}
        discoveryDocs={discoveryDocs}
        scope={scope}
        cookiePolicy={'single_host_origin'}
        isSignedIn = {true}    /* This makes sure the user is logged in across different pages of the webapp. */
      />
      {/* Allow guest signin */}
      <p className="my-2">or</p>
      <Button variant="contained" size="large" className="d-inline-block" onClick={() => updateIsGuest(true)}><i class="fas fa-user-alt"></i> Guest</Button>
    </div>
  )
}

export default LoginPage;
