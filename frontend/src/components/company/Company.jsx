import React from 'react';
import PropTypes from 'prop-types';

const Company = ({ company }) => {
  return (
    <li className="list-group-item">
      <h3>{company.name}</h3>
      <ul className="list-group">
        <li className="list-group-item">ID: {company.companyId}</li>
        <li className="list-group-item">Address: {company.address}</li>
        <li className="list-group-item">Phone: {company.phone}</li>
        <li className="list-group-item">Email: {company.email}</li>
        <li className="list-group-item">
          <p>{company.description}</p>
        </li>
      </ul>
    </li>
  );
};

Company.propTypes = {
  company: PropTypes.object.isRequired
};

export default Company;
