import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import useFormInput from '../../effects/useFormInput';

const Login = () => {
  const email = useFormInput('');
  const password = useFormInput('');

  const auth = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(auth);
    await auth.loginUser({
      email: email.value,
      password: password.value
    });
  }

  return auth.isAuthenticated ? (
    <Redirect to="/profile" />
  ) : (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title text-center">Login</h3>
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
};

export default Login;
