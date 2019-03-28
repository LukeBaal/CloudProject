import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import useFormInput from '../../effects/useFormInput';

const Company = () => {
  const name = useFormInput('');
  const password = useFormInput('');

  const auth = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();

    await auth.loginCompany({
      name: name.value,
      password: password.value
    });
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
                <i className="fas fa-building mr-2" />
                Company Login
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Company Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="form-control"
                    {...name}
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

export default Company;
