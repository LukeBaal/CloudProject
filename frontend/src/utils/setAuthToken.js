import axios from 'axios';

const setAuthToken = token => {
  if (token.length > 0) {
    axios.defaults.headers.common['Authorization'] = token;
    axios.defaults.headers.common['X-Access-Token'] =
      process.env.REACT_APP_API_TOKEN;
  } else {
    delete axios.defaults.headers.common['Authorization'];
    delete axios.defaults.headers.common['X-Access-Token'];
  }
};

export default setAuthToken;
