import React from 'react';
import useFormInput from '../../effects/useFormInput';
import axios from 'axios';

const Register = props => {
  const firstname = useFormInput('');
  const lastname = useFormInput('');
  const email = useFormInput('');
  const address = useFormInput('');
  const phone = useFormInput('');
  const age = useFormInput('');
  const password = useFormInput('');
  const password2 = useFormInput('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (password.value === password2.value) {
      const userData = {
        firstname: firstname.value,
        lastname: lastname.value,
        email: email.value,
        address: address.value,
        phone: phone.value,
        age: age.value,
        password: password.value
      };

      await axios
        .post('/api/users/register', userData)
        .then(res => props.history.push('/login'))
        .catch(err => console.log(err));
    }
  }

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">
              <i className="fas fa-user mr-2" />
              Register
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 form-group">
                  <label htmlFor="firstname">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstname"
                    {...firstname}
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label htmlFor="lastname">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastname"
                    {...lastname}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  {...email}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  {...address}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  {...phone}
                />
              </div>
              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  className="form-control"
                  id="age"
                  {...age}
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
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
