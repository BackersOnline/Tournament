import React, { Component } from 'react';
import {
  Router,
  Route,
  Switch
} from 'react-router-dom';
import history from '../../utils/history'
import routes from '../../utils/routes';

class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          {
            routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            ))
          }
        </Switch>
      </Router>
    )
  }
}

export default Routes;