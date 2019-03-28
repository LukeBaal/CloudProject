import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../contexts/AuthContext';
import axios from 'axios';

const CompanyProfile = () => {
  const auth = useContext(AuthContext);
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // Get company entry in hyperleder

      let URLParams = encodeURIComponent(JSON.stringify(params));
      let res = await axios.get('http://localhost:3000/api/company');

      // Get Permissions for company
      let params = {
        where: {
          company: auth.company.id
        }
      };

      URLParams = encodeURIComponent(JSON.stringify(params));
      res = await axios.get(
        `http://localhost:3000/api/permissions?filter=${URLParams}`
      );

      setPermissions(res.data);
      console.log(permissions);
    }
    fetchData();
  }, []);

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">{auth.company.name}</h3>
      </div>
    </div>
  );
};

export default CompanyProfile;
