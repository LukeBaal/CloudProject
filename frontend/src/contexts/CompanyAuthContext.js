import React from 'react';

const AuthContext = React.createContext({
  isAuthenticated: false,
  company: null,
  loginCompany: () => {},
  logoutCompany: () => {}
});

export default AuthContext;
