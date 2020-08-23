import * as React from 'react';
import {Route} from 'react-router-dom';
import CreateTeam from './pages/CreateTeam';
import Team from './pages/Team';

/**
 * Our static route configuration.
 */
const routes = [
  {
    path: '/',
    exact: true,
    component: CreateTeam,
  },
  {
    path: '/:teamCode',
    component: Team,
  }
];

/**
 * Component to recursively render nested routes
 */
export const RouteRenderer = route => (
  <Route
    path={route.path}
    exact={route.exact}
    render={props => (
      <route.component
        {...route.props || {}}
        {...props}
        routes={route.routes}
      />
    )}
  />
);

export default routes;
