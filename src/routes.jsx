import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
import App from './App';
import HomePage from './modules/root/containers/HomePage';
import LoginPage from './modules/auth/containers/LoginPage'

const Routes = () => (
  <App>
    <Router history={hashHistory}>
      <Route path="/" component={HomePage}/>
      <Route path="/login" component={LoginPage}/>
    </Router>
  </App>
);

export default Routes;