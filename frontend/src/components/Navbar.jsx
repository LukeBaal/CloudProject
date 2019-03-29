import React, { useContext, useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const Navbar = () => {
  const auth = useContext(AuthContext);

  const guestLinks = (
    <>
      <NavLink exact className="nav-item nav-link" to="/login">
        Login
      </NavLink>
      <NavLink exact className="nav-item nav-link" to="/register">
        Register
      </NavLink>
      <NavLink exact className="nav-item nav-link" to="/company/login">
        Company Login
      </NavLink>
      <NavLink exact className="nav-item nav-link" to="/company/register">
        Company Register
      </NavLink>
    </>
  );
  const [links, setLinks] = useState(guestLinks);

  useEffect(() => {
    if (auth.isAuthenticated && auth.user) {
      setLinks(
        <>
          <NavLink exact className="nav-item nav-link" to="/companies">
            Companies
          </NavLink>
          <Link className="nav-item nav-link" to="/profile">{`${
            auth.user.firstname
          } ${auth.user.lastname}`}</Link>
          <button
            className="nav-item nav-link btn btn-flat"
            to="/login"
            onClick={auth.logout}
          >
            Logout
          </button>
        </>
      );
    } else if (auth.isAuthenticated && auth.company) {
      setLinks(
        <>
          <Link className="nav-item nav-link" to="/company/profile">
            {auth.company.name}
          </Link>
          <button
            className="nav-item nav-link btn btn-flat"
            to="/company/login"
            onClick={auth.logout}
          >
            Logout
          </button>
        </>
      );
    } else {
      setLinks(guestLinks);
    }
  }, [auth.isAuthenticated]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <Link className="navbar-brand" to="/">
        Consent Manager
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <div className="navbar-nav mr-auto">
          <NavLink exact className="nav-item nav-link" to="/">
            Home
          </NavLink>
        </div>

        <ul className="navbar-nav ml-auto">{links}</ul>
      </div>
    </nav>
  );
};

export default Navbar;
