import React, { useContext } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import AuthContext from '../../contexts/AuthContext';
import useFormInput from '../../effects/useFormInput';
import setAuthToken from '../../utils/setAuthToken';

const UpdateProfile = () => {
  const auth = useContext(AuthContext);
  const { firstname, lastname, email, address, phone, age } = auth.user;

  const firstnameInput = useFormInput(firstname);
  const lastnameInput = useFormInput(lastname);
  const emailInput = useFormInput(email);
  const addressInput = useFormInput(address);
  const phoneInput = useFormInput(phone);
  const ageInput = useFormInput(age);

  async function handleSubmit(e) {
    e.preventDefault();
    const userData = {
      firstname: firstnameInput.value,
      lastname: lastnameInput.value,
      email: emailInput.value,
      address: addressInput.value,
      phone: phoneInput.value,
      age: ageInput.value
    };

    try {
      // Update user
      const res = await axios.put('/api/users', userData);
      const { token } = res.data;
      setAuthToken(token);
      localStorage.setItem('jwtToken', token);
      const decoded = await jwt_decode(token);
      auth.user = decoded;
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title text-center">Profile</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstname"
              {...firstnameInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastname"
              {...lastnameInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              {...emailInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              {...addressInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              {...phoneInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              className="form-control"
              id="age"
              {...ageInput}
            />
          </div>
          <button type="submit" className="btn btn-block btn-warning">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
