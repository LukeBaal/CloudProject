import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import useFormInput from '../../effects/useFormInput';
import { loginUser } from '../../reducers/AuthReducer';

const Login = () => {
  const email = useFormInput('');
  const password = useFormInput('');

  const { auth, dispatch } = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();

    // await auth.loginUser({
    //   email: email.value,
    //   password: password.value
    // });
    const userData = {
      email: email.value,
      password: password.value
    };

    // dispatch({ type: LOGIN_USER, payload: userData });
    loginUser(dispatch, userData);
  }

  if (auth.isAuthenticated && auth.company) {
    return <Redirect to="/company/profile" />;
  } else if (auth.isAuthenticated && auth.user) {
    return <Redirect to="/profile" />;
  } else {
    return (
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">
                <i className="fas fa-user mr-2" />
                Login
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    className="form-control"
                    {...email}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="form-control"
                    {...password}
                  />
                </div>
                <button type="submit" className="btn btn-block btn-primary">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Login;
