import * as React from 'react';
import { Route } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import GoogleAuth from './pages/GoogleAuth';

/**
 * Our static route configuration.
 */
const routes = [{
  path: '/',
  exact: true,
  component: Home,
}, {
  path: '/login',
  component: Login,
}, {
  path: '/google',
  component: GoogleAuth,
}];

/**
 * Component to recursively render nested routes
 */
export const RouteRenderer = (route) => (
  <Route path={route.path} exact={route.exact} render={(props) => (
    <route.component {...props} routes={route.routes} />
  )} />
)

export default routes;
