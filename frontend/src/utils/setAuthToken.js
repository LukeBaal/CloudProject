import axios from 'axios';

const setAuthToken = token => {
  if (token.length > 0) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
