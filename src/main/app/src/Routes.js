import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './pages/HomePage';
import ScheduleActivityPage from './pages/ScheduleActivityPage';
import BrowsePage from './pages/BrowsePage';
import HelpPage from './pages/HelpPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';

/* Routes address bar to corresponding page components */
const Routes = ({activity, updateActivity, updateServlet, links, isLoggedIn, updateIsLoggedIn, accessToken, updateAccessToken, userId, updateUserId, greeting, updateGreeting}) => {
    return (
      <Switch>
        <Route exact path='/' render={() => <HomePage activity={activity} updateActivity={updateActivity} updateServlet={updateServlet}/>}/>
        <Route exact path='/schedule-activity' render={() => <ScheduleActivityPage isLoggedIn={isLoggedIn} accessToken={accessToken} userId={userId} />}/>
        <Route exact path ='/browse' render={() => <BrowsePage activity={activity} updateActivity={updateActivity} updateServlet={updateServlet} links={links} />}/>
        <Route exact path='/help' component={HelpPage} />
        <Route exact path='/about' component={AboutPage} />
        <Route exact path ='/login' render={() => <LoginPage isLoggedIn={isLoggedIn} updateIsLoggedIn={updateIsLoggedIn} updateAccessToken={updateAccessToken} 
          updateUserId={updateUserId} greeting={greeting} updateGreeting={updateGreeting} />}/>

        <Route
          render={function() {
            return <h1>Not Found</h1>;
          }}
        />
      </Switch>
    );
}

export default Routes;
