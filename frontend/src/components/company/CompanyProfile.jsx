import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../contexts/AuthContext';
import axios from 'axios';
import CompanyPermissions from './CompanyPermissions';

const CompanyProfile = () => {
  const auth = useContext(AuthContext);
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // Get company entry in hyperleder
      let params = {
        where: {
          name: auth.company.name
        }
      };
      let URLParams = encodeURIComponent(JSON.stringify(params));
      let res = await axios.get(
        `http://localhost:3000/api/company?filter=${URLParams}`
      );

      // Get Permissions for company
      params = {
        where: {
          company: `resource:ca.uoit.consensusnetwork.Company#${
            res.data[0].companyId
          }`
        }
      };
      URLParams = encodeURIComponent(JSON.stringify(params));
      res = await axios.get(
        `http://localhost:3000/api/permissions?filter=${URLParams}`
      );

      setPermissions(res.data);
    }
    fetchData();
  }, []);

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">{auth.company.name}</h3>
        <ul className="list-group">
          {permissions.map(permissionsItem => (
            <CompanyPermissions
              key={permissionsItem}
              permissions={permissionsItem}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CompanyProfile;
