import { describe } from 'riteway';
import { reducer, defaultState } from '../src/reducers/PermissionsReducer';

describe('Permissions Reducer', async assert => {
  assert({
    given: 'no arguements',
    should: 'return initial state',
    actual: reducer(),
    expected: defaultState
  });

  // {
  //   const permissions = [
  //     {
  //       pairKey: 'pair-key',
  //       company: 'some-company',
  //       name: true,
  //       email: true,
  //       phone: false,
  //       address: false,
  //       age: false
  //     }
  //   ];

  //   const permissionsItem = {
  //     pairKey: 'pair-key2',
  //     company: 'some-company2',
  //     name: true,
  //     email: false,
  //     phone: true,
  //     address: true,
  //     age: false
  //   };

  //   assert({
  //     given: 'a new company',
  //     should: 'add company to state',
  //     actual: reducer({ permissions }, addCompany(company)),
  //     expected: { companies: companies.concat(company) }
  //   });
  // }
});
