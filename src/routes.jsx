import React from 'react';
import {Router, Route} from 'react-router';
import App from './App';
import HomePage from './modules/root/containers/HomePage';
import LoginPage from './modules/auth/containers/LoginPage'
import AsyncApp from "./modules/posts/contairners/AsyncApp";

export default class Routes extends React.Component {
  render() {
    return (
      <App>
        <Router history={this.props.history}>
          <Route path="/" component={HomePage}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/posts" component={AsyncApp}/>
        </Router>
      </App>)
      ;
  }
}