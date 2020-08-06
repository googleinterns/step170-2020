import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './pages/HomePage';
import ScheduleActivityPage from './pages/ScheduleActivityPage';
import BrowsePage from './pages/BrowsePage';
import HelpPage from './pages/HelpPage';
import AboutPage from './pages/AboutPage';

/* Routes address bar to corresponding page components */
const Routes = ({activity, updateActivity, links}) => {   // Taking in these from App.js and passing it other components.
    return (
      <Switch>
        <Route exact path='/' render={() => <HomePage activity={activity} updateActivity={updateActivity}/>}/>
        <Route exact path='/schedule-activity' render={() => <ScheduleActivityPage activity={activity} updateActivity={updateActivity}/>}/>
        <Route exact path ='/browse' render={() => <BrowsePage activity={activity} updateActivity={updateActivity} links={links} />}/>
        <Route exact path='/help' component={HelpPage} />
        <Route exact path='/about' component={AboutPage} />

        <Route
          render={function() {
            return <h1>Not Found</h1>;
          }}
        />
      </Switch>
    );
}

export default Routes;
