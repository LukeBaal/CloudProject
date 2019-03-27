import React, { useContext, useEffect } from 'react';
import useFormInputWithSetter from '../../effects/useFormInputWithSetter';
import axios from 'axios';
import AuthContext from '../../contexts/AuthContext';

const UpdateProfile = () => {
  const auth = useContext(AuthContext);

  const firstnameInput = useFormInputWithSetter('');
  const lastnameInput = useFormInputWithSetter('');
  const emailInput = useFormInputWithSetter('');
  const addressInput = useFormInputWithSetter('');
  const phoneInput = useFormInputWithSetter('');
  const ageInput = useFormInputWithSetter('');

  useEffect(() => {
    async function fetchUserData() {
      try {
        const res = await axios.get('/api/users/current');
        const { firstname, lastname, email, phone, address, age } = res.data;
        firstnameInput.setValue(firstname);
        lastnameInput.setValue(lastname);
        emailInput.setValue(email);
        addressInput.setValue(address);
        phoneInput.setValue(phone);
        ageInput.setValue(age);
      } catch (e) {
        console.log(e);
      }
    }
    fetchUserData();
  });

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
      await axios.put('/api/users', userData);
      // Get updated user details
      const res = await axios.get('/api/users/current');
      auth.setUser(res.data);
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
