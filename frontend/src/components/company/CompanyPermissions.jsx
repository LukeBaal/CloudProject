import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CompanyPermissions = ({ permissions }) => {
  const [items, setItems] = useState({});

  useEffect(() => {
    axios.get(`/api/users/${permissions.pairKey}`).then(res => {
      setItems(res.data);
    });
  }, []);

  return (
    <div className="card mt-2">
      <div className="card-body">
        <ul className="list-group">
          {items.name ? (
            <li className="list-group-item">Name: {items.name}</li>
          ) : (
            ''
          )}
          {items.email ? (
            <li className="list-group-item">Email: {items.email}</li>
          ) : (
            ''
          )}
          {items.phone ? (
            <li className="list-group-item">Phone: {items.phone}</li>
          ) : (
            ''
          )}
          {items.address ? (
            <li className="list-group-item">Address: {items.address}</li>
          ) : (
            ''
          )}
          {items.age ? (
            <li className="list-group-item">Age: {items.age}</li>
          ) : (
            ''
          )}
        </ul>
      </div>
    </div>
  );
};

export default CompanyPermissions;
