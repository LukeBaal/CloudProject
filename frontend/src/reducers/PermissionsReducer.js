export const setPermissions = permissions => ({
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
