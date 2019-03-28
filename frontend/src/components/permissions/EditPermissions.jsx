import axios from 'axios';
import React, { useState } from 'react';
import useCheckInput from '../../effects/useCheckInput';

const EditPermissions = props => {
  const {
    pairKey,
    name,
    email,
    phone,
    address,
    age,
    company
  } = props.location.state.permissions;

  const nameInput = useCheckInput(name);
  const emailInput = useCheckInput(email);
  const phoneInput = useCheckInput(phone);
  const addressInput = useCheckInput(address);
  const ageInput = useCheckInput(age);

  const [submitBtnText, setSubmitBtnText] = useState('Edit');

  async function handleSubmit(e) {
    e.preventDefault();

    setSubmitBtnText('Sending...');

    await axios.put(
      `http://localhost:3000/api/permissions/${pairKey}`,
      JSON.stringify({
        $class: 'ca.uoit.consensusnetwork.Permissions',
        pairKey,
        name: nameInput.checked,
        email: emailInput.checked,
        phone: phoneInput.checked,
        address: addressInput.checked,
        age: ageInput.checked,
        company: company.companyId
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    );

    props.history.push('/profile');
  }

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title text-center">Edit Permissions</h3>
            <form onSubmit={handleSubmit}>
              <div className="custom-control custom-switch">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="name"
                  {...nameInput}
                />
                <label htmlFor="name" className="custom-control-label">
                  Name
                </label>
              </div>
              <div className="custom-control custom-switch">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="email"
                  {...emailInput}
                />
                <label htmlFor="email" className="custom-control-label">
                  Email
                </label>
              </div>
              <div className="custom-control custom-switch">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  {...phoneInput}
                  id="phone"
                />
                <label htmlFor="phone" className="custom-control-label">
                  Phone
                </label>
              </div>
              <div className="custom-control custom-switch">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  {...addressInput}
                  id="address"
                />
                <label htmlFor="address" className="custom-control-label">
                  Address
                </label>
              </div>
              <div className="custom-control custom-switch">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="age"
                  {...ageInput}
                />
                <label htmlFor="age" className="custom-control-label">
                  Age
                </label>
              </div>

              <button className="mt-2 btn btn-block btn-warning">
                {submitBtnText}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPermissions;
