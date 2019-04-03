import React, { lazy, Suspense, useEffect, useState } from 'react';
import axios from 'axios';

const Company = lazy(() => import('./Company'));

const CompanyContainer = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/Company').then(res => {
      setCompanies(res.data);
    });
  }, []);

  return (
    <div>
      <h2>Companies</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <ul className="list-group">
          {companies.map(company => (
            <Company key={company.companyId} company={company} />
          ))}
        </ul>
      </Suspense>
    </div>
  );
};

export default CompanyContainer;
