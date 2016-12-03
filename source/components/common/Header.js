import React from 'react';
import { Link, IndexLink } from 'react-router';

const Header = () => {
  return (
    <header>
      <h1>Hapi React Redux Starter</h1>
      <nav>
        <IndexLink to="/" activeClassName="active">Home</IndexLink>
        {" | "}
        <Link to="/courses" activeClassName="active">Courses</Link>
        {" | "}
        <Link to="/about" activeClassName="active">About</Link>
      </nav>
    </header>
  );
};

export default Header;
