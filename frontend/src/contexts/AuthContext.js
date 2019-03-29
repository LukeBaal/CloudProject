import React from 'react';

const AuthContext = React.createContext({
  state: {},
  dispatch: () => {}
});

export default AuthContext;
