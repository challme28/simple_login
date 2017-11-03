import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
import App from './App';
import HomePage from './modules/root/containers/HomePage';
import LoginPage from './modules/auth/containers/LoginPage'

export default class Routes extends React.Component {
  render() {
    return (
      <App>
        <Router history={hashHistory}>
          <Route path="/" component={HomePage}/>
          <Route path="/login" component={LoginPage}/>
        </Router>
      </App>)
      ;
  }
}