import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';

const Landing = () => {
  const auth = useContext(AuthContext);

  if (auth.isAuthenticated && auth.user) {
    return <Redirect to="/profile" />;
  } else if (auth.isAuthenticated && auth.company) {
    return <Redirect to="/company/profile" />;
  } else {
    return <Redirect to="/login" />;
  }
};

export default Landing;
