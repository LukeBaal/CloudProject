import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_COMPANY = 'LOGIN_COMPANY';
export const LOGOUT = 'LOGOUT';

const defaultState = {
  isAuthenticated: false,
  user: null,
  company: null
};

export const loginUser = async (dispatch, userData) => {
  try {
    const res = await axios.post('/api/users/login', userData);
    // Save token to local storage
    const { token } = res.data;
    localStorage.setItem('jwtToken', token);

    // Set token to Auth header
    setAuthToken(token);
    const decoded = jwt_decode(token);
    dispatch({
      type: LOGIN_USER,
      payload: {
        isAuthenticated: true,
        user: decoded
      }
    });
  } catch (e) {
    console.log(e);
  }
};

export const loginCompany = async (dispatch, companyData) => {
  try {
    const res = await axios.post('/api/company/login', companyData);
    // Save token to local storage
    const { token } = res.data;
    localStorage.setItem('jwtTokenCompany', token);

    // Set token to Auth header
    setAuthToken(token);
    const decoded = jwt_decode(token);
    dispatch({
      type: LOGIN_COMPANY,
      payload: {
        isAuthenticated: true,
        company: decoded
      }
    });
  } catch (e) {
    console.log(e);
  }
};

const logout = () => {
  // Log company/user out
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('jwtTokenCompany');
  setAuthToken('');
  return defaultState;
};

const AuthReducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case LOGIN_USER:
    case LOGIN_COMPANY:
      // return loginUser(state, action.payload).then(newState => newState);
      return Object.assign({}, state, action.payload);
    case LOGOUT:
      return logout();
    default:
      return state;
  }
};

export default AuthReducer;
