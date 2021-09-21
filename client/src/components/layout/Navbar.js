import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      setIsAuth(true);
    }
  }, []);

  return (
    <nav className="alg">
      <h1 className="heading"><span className="headingspan">FINANCE</span>PEER</h1>
      
      <ul>
        {isAuth === true ? (
          <Fragment>
            <h4 className="lg">
              <Link to='/dashboard'>Dashboard</Link>
            </h4>
            <h4 className="lg">
              <Link to='/logout'>Logout</Link>
            </h4>
          </Fragment>
        ) : (
          <Fragment>
            {' '}
            <h4 className="lg">
              <Link to='/login'>Login</Link>
            </h4>
            <h4 className="lg">
              <Link to='/signup'>Signup</Link>
            </h4>
          </Fragment>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
