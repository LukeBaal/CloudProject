import axios from 'axios';

export const fetchPermissions = async dispatch => {
  const res = await axios.get(
    'http://localhost:3000/api/permissions?filter=%7B%22include%22%3A%20%22resolve%22%7D'
  );
  let permissions = res.data;

  // permissions = permissions.map(async permissionsItem => {
  //   const { company } = permissionsItem;
  //   const id = company.substr(company.indexOf('#') + 1);
  //   const companyRes = await axios.get(
  //     `http://localhost:3000/api/company/${id}`
  //   );

  //   return {
  //     ...permissionsItem,
  //     company: companyRes.data.name
  //   };
  // });

  // console.log(permissions);

  dispatch(setPermissions(permissions));
};

const setPermissions = permissions => ({
  type: 'permissions/setPermissions',
  payload: permissions
});

export const defaultState = {
  permissions: []
};

export const reducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case setPermissions().type:
      return {
        ...state,
        permissions: action.payload
      };
    default:
      return state;
  }
};
