import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Permissions = ({ permissions }) => {
  const { pairKey, name, email, phone, address, age, company } = permissions;

  const getIcon = field =>
    field ? (
      <i className="ml-2 fas fa-check text-success" />
    ) : (
      <i className="ml-2 fas fa-times text-danger" />
    );

  return (
    <div className="card mt-2">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h4 className="lead">Company ID: {company.name}</h4>
          <Link
            className="btn btn-warning"
            to={{ pathname: '/permissions/edit', state: { permissions } }}
          >
            <i className="fas fa-pencil-alt" />
          </Link>
        </div>
        <ul className="list-group">
          <li className="list-group-item" name="pairKey">
            Pair Key: {pairKey}
          </li>
          <li className="list-group-item" name="name">
            Name: {getIcon(name)}
          </li>
          <li className="list-group-item" name="email">
            Email: {getIcon(email)}
          </li>
          <li className="list-group-item" name="phone">
            Phone: {getIcon(phone)}
          </li>
          <li className="list-group-item" name="address">
            Address: {getIcon(address)}
          </li>
          <li className="list-group-item" name="age">
            Age: {getIcon(age)}
          </li>
        </ul>
      </div>
    </div>
  );
};

Permissions.propTypes = {
  permissions: PropTypes.object.isRequired
};

export default Permissions;
