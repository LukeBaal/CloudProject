import React from 'react';
import useFormInput from '../../effects/useFormInput';
import axios from 'axios';
import uuidv4 from 'uuid/v4';

const Register = props => {
  const name = useFormInput('');
  const email = useFormInput('');
  const address = useFormInput('');
  const phone = useFormInput('');
  const description = useFormInput('');
  const password = useFormInput('');
  const password2 = useFormInput('');

  // [{"$class":"ca.uoit.consensusnetwork.Company","companyId":"72dd4177-3432-4944-b164-d8786f797a09","name":"Fake co.","description":"Car insurance","address":"67 Simcoe St.","phone":"555-423-7894","email":"contact@fake.com"},{"$class":"ca.uoit.consensusnetwork.Company","companyId":"cc3efd62-81bf-4f24-9691-0d0d3383ddb3","name":"ACME Insurance","description":"We ensure we insure it all","address":"25 Main St.","phone":"555-123-4567","email":"contact@acme.org"}]

  // {
  //   "$class": "ca.uoit.consensusnetwork.Company",
  //   "address": "123 Test Dr.",
  //   "companyId": "6e32a09a-7e24-4574-9e8c-410c2119ad7a",
  //   "description": "This is a test company.",
  //   "email": "contact@test.net",
  //   "name": "Test Co.",
  //   "phone": "123-414-1415"
  //   }

  async function handleSubmit(e) {
    e.preventDefault();
    if (password.value === password2.value) {
      // try {
      //   // Add login info to DB
      //   await axios.post('/api/company/register', {
      //     name: name.value,
      //     password: password.value
      //   });
      // } catch (e) {
      //   console.log(e);
      // }

      try {
        // Add Company info to Hyperledger
        await axios.post('http://localhost:3000/api/company', {
          $class: 'ca.uoit.consensusnetwork.Company',
          companyId: uuidv4(),
          name: name.value,
          description: description.value,
          address: address.value,
          phone: phone.value,
          email: email.value
        });
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
                <label htmlFor="description">Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  id="description"
                  cols="30"
                  rows="10"
                  {...description}
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
