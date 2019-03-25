import React, { lazy, Suspense } from 'react';
import CompanyContext from '../../contexts/CompanyContext';

const Company = lazy(() => import('./Company'));

const CompanyContainer = () => {
  return (
    <div>
      <h2>Companies</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <CompanyContext.Consumer>
          {companies => (
            <ul className="list-group">
              {companies.map(company => (
                <Company key={company.companyId} company={company} />
              ))}
            </ul>
          )}
        </CompanyContext.Consumer>
      </Suspense>
    </div>
  );
};

export default CompanyContainer;
