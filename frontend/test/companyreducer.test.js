import { describe } from 'riteway';
import {
  reducer,
  defaultState,
  addCompany
} from '../src/reducers/CompanyReducer';

describe('Company Reducer', async assert => {
  assert({
    given: 'no arguements',
    should: 'return initial state',
    actual: reducer(),
    expected: defaultState
  });

  {
    const companies = [
      {
        companyId: 'adw399adja9dj',
        name: 'ACME',
        description: 'Production Company',
        address: '5 Main St.',
        phone: '(555) 555-5555',
        email: 'contact@acme.com'
      }
    ];

    const company = {
      companyId: 'rg9fa9fia9fa9',
      name: 'Fake Company Inc.',
      description: 'Insurance Company',
      address: '55 Simcoe St.',
      phone: '(555) 555-1234',
      email: 'contact@fakecompany.com'
    };

    assert({
      given: 'a new company',
      should: 'add company to state',
      actual: reducer({ companies }, addCompany(company)),
      expected: { companies: companies.concat(company) }
    });
  }
});
