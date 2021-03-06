import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';

const PrivateRoute = props => {
  const auth = useContext(AuthContext);

  const { component, render, ...rest } = props;
  if (auth.isAuthenticated && auth.user) {
    return <Route {...rest} component={component} />;
  } else {
    return <Redirect to="/login" />;
  }
};

export default PrivateRoute;
