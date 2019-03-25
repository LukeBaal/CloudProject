import React, { useReducer, useEffect, lazy, Suspense } from 'react';
import { reducer, addCompany } from '../../reducers/CompanyReducer';

const Company = lazy(() => import('./Company'));

const CompanyContainer = () => {
  const [{ companies }, dispatch] = useReducer(reducer, reducer());

  useEffect(() => {
    const companies = [
      {
        companyId: 'adw399adja9dj',
        name: 'ACME',
        description: 'Production Company',
        address: '5 Main St.',
        phone: '(555) 555-5555',
        email: 'contact@acme.com'
      },
      {
        companyId: 'rg9fa9fia9fa9',
        name: 'Fake Company Inc.',
        description: 'Insurance Company',
        address: '55 Simcoe St.',
        phone: '(555) 555-1234',
        email: 'contact@fakecompany.com'
      }
    ];

    companies.forEach(async company => dispatch(addCompany(company)));
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
