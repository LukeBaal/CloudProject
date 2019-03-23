import { describe } from 'riteway';
import React from 'react';
import render from 'riteway/render-component';
import Company from '../src/components/company/Company';

describe('Company Item Component', async assert => {
  const createCompany = company => render(<Company company={company} />);

  {
    const company = {
      companyId: 'adw399adja9dj',
      name: 'ACME',
      description: 'Production Company',
      address: '5 Main St.',
      phone: '(555) 555-5555',
      email: 'contact@acme.com'
    };

    const CompanyComponent = createCompany(company);
    assert({
      given: 'a company',
      should: 'render the company name',
      actual: CompanyComponent('h3')
        .html()
        .trim(),
      expected: company.name
    });

    assert({
      given: 'a company',
      should: 'render the company id',
      actual: CompanyComponent('ul > li')
        .html()
        .trim(),
      expected: `ID: ${company.companyId}`
    });

    assert({
      given: 'a company',
      should: 'render the company description',
      actual: CompanyComponent('p')
        .html()
        .trim(),
      expected: company.description
    });
  }

  {
    const company = {
      companyId: 'adw399adja9dj',
      name: 'Fake Company Inc.',
      description: 'Insurance Company',
      address: '55 Simcoe St.',
      phone: '(555) 555-1234',
      email: 'contact@fakecompany.com'
    };

    const CompanyComponent = createCompany(company);
    assert({
      given: 'a company',
      should: 'render the company name',
      actual: CompanyComponent('h3')
        .html()
        .trim(),
      expected: company.name
    });

    assert({
      given: 'a company',
      should: 'render the company id',
      actual: CompanyComponent('ul > li')
        .html()
        .trim(),
      expected: `ID: ${company.companyId}`
    });

    assert({
      given: 'a company',
      should: 'render the company description',
      actual: CompanyComponent('p')
        .html()
        .trim(),
      expected: company.description
    });
  }
});
