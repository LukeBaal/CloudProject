import React from 'react';
import Permissions from '../permissions/Permissions';
import axios from 'axios';

const CompanyPermissions = ({ permissions }) => {
  const fetchData = async () => {
    const res = await axios.get(`/api/users/${permissions.pairKey}`);
    console.log(res.data);
  };

  return (
    <div>
      <Permissions permissions={permissions} showCompanyId={false} />
      <button className="btn btn-primary" onClick={fetchData}>
        Fetch
      </button>
    </div>
  );
};

export default CompanyPermissions;
