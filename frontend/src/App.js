import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthContext from './contexts/AuthContext';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

import setAuthToken from './utils/setAuthToken';
import CompanyContainer from './components/company/CompanyContainer';
import Navbar from './components/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

const App = () => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    loginUser: () => {},
    logoutUser: () => {}
  });

  const loginUser = async userData => {
    try {
      const res = await axios.post('/api/users/login', userData);
      // Save token to local storage
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);

      // Set token to Auth header
      setAuthToken(token);
      const decoded = jwt_decode(token);
      setAuth({
        ...auth,
        isAuthenticated: true,
        user: decoded
      });
    } catch (e) {
      console.log(e);
    }
  };

  const logoutUser = () => {
    // Log user out
    localStorage.removeItem('jwtToken');
    setAuthToken('');
    setAuth({
      ...auth,
      isAuthenticated: false,
      user: null
    });
  };

  useEffect(() => {
    setAuth({
      ...auth,
      loginUser,
      logoutUser
    });
  }, []);

  useEffect(() => {
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
      const decoded = jwt_decode(localStorage.jwtToken);
      setAuth({
        ...auth,
        isAuthenticated: true,
        user: decoded
      });

      // Check for expired token
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        // Logout user
        setAuth({
          ...auth,
          isAuthenticated: false,
          user: null
        });
      }
    }
  });

  return (
    <AuthContext.Provider value={auth}>
      <Router>
        <Navbar />
        <div className="container mt-3">
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/companies" component={CompanyContainer} />
          </Switch>
        </div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
