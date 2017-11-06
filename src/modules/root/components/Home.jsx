// @flow
import * as React from 'react';
import { Link } from 'react-router';

export default class Home extends React.Component<{}> {
  render() {
    return (
      <div>
        <h2>Home</h2>
        <Link to="/login">Login</Link>
      </div>
    )
  }
};