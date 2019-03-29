import React from 'react';

const AuthContext = React.createContext({
  isAuthenticated: false,
  user: null,
  company: null,
  loginUser: () => {},
  loginCompany: () => {},
  logout: () => {}
});

export default AuthContext;
