import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';

const PrivateRoute = props => {
  const auth = useContext(AuthContext);

  const { component, render, ...rest } = props;
  return auth.isAuthenticated ? (
    <Route {...rest} component={component} />
  ) : (
    <Redirect to="/login" />
  );
};

export default PrivateRoute;
