import React, { useState } from 'react';
import useFormInput from '../../effects/useFormInput';
import axios from 'axios';

const Register = props => {
  const name = useFormInput('');
  const password = useFormInput('');
  const password2 = useFormInput('');

  const [submitBtnText, setSubmitBtnText] = useState('Submit');

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitBtnText('Sending...');
    if (password.value === password2.value) {
      try {
        // Add login info to DB
        await axios.post('/api/company/register', {
          name: name.value,
          password: password.value
        });
        props.history.push('/company/login');
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">
              <i className="fas fa-building mr-2" />
              Company Register
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Company Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  {...name}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  {...password}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password2">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password2"
                  {...password2}
                />
              </div>
              <button type="submit" className="btn btn-block btn-primary">
                {submitBtnText}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
