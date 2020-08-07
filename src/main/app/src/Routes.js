import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './pages/HomePage';
import ScheduleActivityPage from './pages/ScheduleActivityPage';
import BrowsePage from './pages/BrowsePage';
import HelpPage from './pages/HelpPage';
import AboutPage from './pages/AboutPage';

/* Routes address bar to corresponding page components */
class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/schedule-activity' component={ScheduleActivityPage} />
        <Route exact path='/browse' component={BrowsePage}/>
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
}

export default Routes;
