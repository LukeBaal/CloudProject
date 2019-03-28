import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';

const PrivateRoute = props => {
  const auth = useContext(AuthContext);

  const { component, render, ...rest } = props;
  if (auth.isAuthenticated && auth.company) {
    return <Route {...rest} component={component} />;
  } else {
    return <Redirect to="/company/login" />;
  }
};

export default PrivateRoute;
