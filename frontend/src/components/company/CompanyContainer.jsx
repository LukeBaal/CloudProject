import React, { useReducer, useEffect } from 'react';
import { reducer, addCompany } from '../../reducers/CompanyReducer';
import Company from './Company';

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

    companies.forEach(company => dispatch(addCompany(company)));
  }, []);

  return companies ? (
    <div>
      <h2>Companies</h2>
      <ul className="list-group">
        {companies.map(company => (
          <Company key={company.companyId} company={company} />
        ))}
      </ul>
    </div>
  ) : (
    <h3>Loading...</h3>
  );
};

export default CompanyContainer;
