import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './pages/HomePage';
import ScheduleActivityPage from './pages/ScheduleActivityPage';
import BrowsePage from './pages/BrowsePage';
import HelpPage from './pages/HelpPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';

/* Routes address bar to corresponding page components */
const Routes = ({ activityType, updateActivityType, activity, updateActivity, updateServlet, links, isLoggedIn, updateIsLoggedIn, 
  accessToken, updateAccessToken, userId, updateUserId, greeting, updateGreeting,schedule_browse_button, changeButton, articleData, videoData, gameData,
  eventScheduled, updateEventScheduled }) => {
    return (
      <Switch>
        <Route exact path='/' render={() => <HomePage activityType={activityType} updateActivityType={updateActivityType} updateServlet={updateServlet} articleData={articleData}
          videoData={videoData} gameData={gameData} eventScheduled={eventScheduled} updateEventScheduled={updateEventScheduled} />}/>
        <Route exact path='/schedule-activity' render={() => <ScheduleActivityPage isLoggedIn={isLoggedIn} accessToken={accessToken} userId={userId} 
          activity={activity} links={links} eventScheduled={eventScheduled} updateEventScheduled={updateEventScheduled} />}/>
        <Route exact path='/browse' render={() => <BrowsePage activityType={activityType} updateActivityType={updateActivityType} updateActivity={updateActivity} 
          updateServlet={updateServlet} links={links} articleData={articleData} videoData={videoData} gameData={gameData} />}/>
        <Route exact path='/help' component={HelpPage} />
        <Route exact path='/about' component={AboutPage} />
        <Route exact path='/login' render={() => <LoginPage isLoggedIn={isLoggedIn} updateIsLoggedIn={updateIsLoggedIn} updateAccessToken={updateAccessToken} 
          updateUserId={updateUserId} greeting={greeting} updateGreeting={updateGreeting} />} />

        <Route
          render={function() {
            return <h1>Not Found</h1>;
          }}
        />
      </Switch>
    );
}

export default Routes;
