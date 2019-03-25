import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <Link className="navbar-brand" to="/">
        Consensus Manager
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
          <NavLink exact className="nav-item nav-link" to="/companies">
            Companies
          </NavLink>
        </div>

        <AuthContext.Consumer>
          {auth => (
            <ul className="navbar-nav ml-auto">
              {auth.isAuthenticated ? (
                <>
                  <Link className="nav-item nav-link" to="/profile">{`${
                    auth.user.firstname
                  } ${auth.user.lastname}`}</Link>
                  <button
                    className="nav-item nav-link btn btn-flat"
                    style={{ cursor: 'pointer' }}
                    onClick={async () => {
                      console.log(auth.logoutUser);
                      await auth.logoutUser();
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink exact className="nav-item nav-link" to="/login">
                    Login
                  </NavLink>
                  <NavLink exact className="nav-item nav-link" to="/register">
                    Register
                  </NavLink>
                </>
              )}
            </ul>
          )}
        </AuthContext.Consumer>
      </div>
    </nav>
  );
};

export default Navbar;
