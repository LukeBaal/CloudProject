import axios from 'axios';
import crypto from 'crypto';
import React, { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import CompanyContext from '../../contexts/CompanyContext';
import useCheckInput from '../../effects/useCheckInput';
import useFormInput from '../../effects/useFormInput';

const AddPermissions = props => {
  const companies = useContext(CompanyContext);
  const auth = useContext(AuthContext);

  const companySelect = useFormInput(-1);
  const name = useCheckInput(true);
  const email = useCheckInput(false);
  const phone = useCheckInput(false);
  const address = useCheckInput(false);
  const age = useCheckInput(false);

  async function handleSubmit(e) {
    e.preventDefault();

    // Hash the user's id and the company's id
    const hash = crypto.createHash('sha256');
    hash.update(`${auth.user.id}-${companySelect.value}`);
    const pairKey = hash.digest('hex');

    await axios.post(
      `http://localhost:3000/api/permissions`,
      JSON.stringify({
        $class: 'ca.uoit.consensusnetwork.Permissions',
        pairKey,
        name: name.checked,
        email: email.checked,
        phone: phone.checked,
        address: address.checked,
        age: age.checked,
        company: companySelect.value
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    );

    // Add pair key to user entry in DB
    await axios.post('/api/permissions', {
      pairKey
    });

    // Update user
    const res = await axios.get('/api/users/current');
    auth.setUser({ user: res.data });

    props.history.push('/profile');
  }

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title text-center">Add Permissions</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="company">Company</label>
                <select
                  name="company"
                  id="company"
                  className="custom-select mb-2"
                  {...companySelect}
                >
                  <option value="-1">Choose a Company</option>
                  {companies.map(company => (
                    <option value={company.companyId} key={company.companyId}>
                      {company.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="custom-control custom-switch">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="name"
                  {...name}
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
                  {...email}
                />
                <label htmlFor="email" className="custom-control-label">
                  Email
                </label>
              </div>
              <div className="custom-control custom-switch">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  {...phone}
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
                  {...address}
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
                  {...age}
                />
                <label htmlFor="age" className="custom-control-label">
                  Age
                </label>
              </div>

              <button className="mt-2 btn btn-block btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPermissions;
