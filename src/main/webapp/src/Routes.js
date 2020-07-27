import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ScheduleActivityPage from './pages/ScheduleActivityPage';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={ScheduleActivityPage} />
        
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
