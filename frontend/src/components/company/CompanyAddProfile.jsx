import React, { useState, useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import useFormInput from '../../effects/useFormInput';
import axios from 'axios';
import uuidv4 from 'uuid/v4';

const Register = props => {
  const email = useFormInput('');
  const address = useFormInput('');
  const phone = useFormInput('');
  const description = useFormInput('');

  const auth = useContext(AuthContext);
  const [submitBtnText, setSubmitBtnText] = useState('Submit');

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitBtnText('Sending...');

    try {
      // Add Company info to Hyperledger
      await axios.post('http://localhost:3000/api/company', {
        $class: 'ca.uoit.consensusnetwork.Company',
        companyId: uuidv4(),
        name: auth.company.name,
        description: description.value,
        address: address.value,
        phone: phone.value,
        email: email.value
      });

      props.history.push('/company/profile');
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">Add Information</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" className="form-control" id="email" {...email} />
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
            <input type="text" className="form-control" id="phone" {...phone} />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              name="description"
              id="description"
              cols="30"
              rows="5"
              {...description}
            />
          </div>
          <button type="submit" className="btn btn-block btn-primary">
            {submitBtnText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
