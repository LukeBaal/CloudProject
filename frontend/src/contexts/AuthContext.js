import React from 'react';

const AuthContext = React.createContext({
  isAuthenticated: false,
  user: null,
  loginUser: () => {},
  logoutUser: () => {}
});

export default AuthContext;
