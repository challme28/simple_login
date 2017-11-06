import React from 'react';
import { Switch, Route } from 'react-router';
import App from './App';
import HomePage from './modules/root/containers/HomePage';
import LoginPage from './modules/auth/containers/LoginPage'

export default class Routes extends React.Component {
  render() {
    return (
      <App>
        <Switch>
          <Route path="/" component={HomePage}/>
          <Route path="/login" component={LoginPage}/>
        </Switch>
      </App>)
      ;
  }
}