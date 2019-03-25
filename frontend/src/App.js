import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthContext from './contexts/AuthContext';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

import setAuthToken from './utils/setAuthToken';
import CompanyContainer from './components/company/CompanyContainer';
import Navbar from './components/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PrivateRoute from './components/common/PrivateRoute';
import Profile from './components/user/Profile';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      user: null,
      loginUser: this.loginUser,
      logoutUser: this.logoutUser,
      setUser: this.setUser
    };
  }

  setUser = user => {
    this.setState({
      ...this.state,
      user
    });
  };

  loginUser = async userData => {
    try {
      const res = await axios.post('/api/users/login', userData);
      // Save token to local storage
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);

      // Set token to Auth header
      setAuthToken(token);
      const decoded = jwt_decode(token);
      this.setState({
        ...this.state,
        isAuthenticated: true,
        user: decoded
      });
    } catch (e) {
      console.log(e);
    }
  };

  logoutUser = () => {
    // Log user out
    localStorage.removeItem('jwtToken');
    setAuthToken('');
    this.setState({
      ...this.state,
      isAuthenticated: false,
      user: null
    });
  };

  componentDidMount() {
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
      const decoded = jwt_decode(localStorage.jwtToken);
      this.setState({
        ...this.state,
        isAuthenticated: true,
        user: decoded
      });

      // Check for expired token
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        // Logout user
        this.setState({
          ...this.state,
          isAuthenticated: false,
          user: null
        });
      }
    }
  }

  render() {
    return (
      <AuthContext.Provider value={this.state}>
        <Router>
          <Navbar />
          <div className="container mt-3">
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute
                exact
                path="/companies"
                component={CompanyContainer}
              />
            </Switch>
          </div>
        </Router>
      </AuthContext.Provider>
    );
  }
}

export default App;
