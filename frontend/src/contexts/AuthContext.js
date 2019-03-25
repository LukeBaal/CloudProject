import React from 'react';

const AuthContext = React.createContext({
  isAuthenticated: false,
  user: null,
  loginUser: () => {},
  logoutUser: () => {},
  setUser: () => {}
});

export default AuthContext;
