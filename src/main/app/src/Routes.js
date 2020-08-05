import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './pages/HomePage';
import ScheduleActivityPage from './pages/ScheduleActivityPage';
import BrowsePage from './pages/BrowsePage';

/* Routes address bar to corresponding page components */
class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/schedule-activity' component={ScheduleActivityPage} />
        <Route exact path ='/browse' component={BrowsePage}/>

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
