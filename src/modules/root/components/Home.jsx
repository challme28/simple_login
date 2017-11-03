// @flow
import * as React from 'react';
import { Link } from 'react-router';

const Home = () => {
  return (
    <div>
      <h2>Home</h2>
      <Link to="/login">Login</Link>
    </div>
  )
};

export default Home;