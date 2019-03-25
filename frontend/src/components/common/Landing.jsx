import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';

const Landing = () => {
  const auth = useContext(AuthContext);

  return auth.isAuthenticated ? (
    <Redirect to="/profile" />
  ) : (
    <Redirect to="/login" />
  );
};

export default Landing;
