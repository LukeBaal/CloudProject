// const getCompanies = () => ({
//   type: 'companies/getCompanies',
//   payload:
// })

export const addCompany = company => ({
  type: 'company/addCompany',
  payload: company
});

export const defaultState = {
  companies: []
};

export const reducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case addCompany().type:
      return Object.assign({}, state, {
        companies: state.companies.concat(action.payload)
      });
    default:
      return state;
  }
};
