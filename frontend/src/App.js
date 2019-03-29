import axios from 'axios';
import jwt_decode from 'jwt-decode';
import React, { useReducer, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import CompanyLogin from './components/company/CompanyLogin';
import CompanyRegister from './components/company/CompanyRegister';
import PrivateRoute from './components/common/PrivateRoute';
import CompanyPrivateRoute from './components/common/CompanyPrivateRoute';
import CompanyContainer from './components/company/CompanyContainer';
import Navbar from './components/Navbar';
import AddPermissions from './components/permissions/AddPermissions';
import EditPermissions from './components/permissions/EditPermissions';
import Landing from './components/common/Landing';
import Profile from './components/user/Profile';
import CompanyProfile from './components/company/CompanyProfile';
import AuthContext from './contexts/AuthContext';
import CompanyContext from './contexts/CompanyContext';
import setAuthToken from './utils/setAuthToken';
import AuthReducer, {
  LOGOUT,
  loginUser,
  loginCompany
} from './reducers/AuthReducer';

// class App extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       auth: {
//         isAuthenticated: false,
//         user: null,
//         company: null,
//         loginUser: this.loginUser,
//         logoutUser: this.logoutUser,
//         loginCompany: this.loginCompany,
//         logoutCompany: this.logoutCompany
//       },
//       companies: []
//     };
//   }

//   // setUser: user =>
//   // this.setState({
//   //   auth: {
//   //     ...this.state.auth,
//   //     user
//   //   }
//   // })

//   loginUser = async userData => {
//     if (this.state.isAuthenticated) {
//       return;
//     }
//     try {
//       const res = await axios.post('/api/users/login', userData);
//       // Save token to local storage
//       const { token } = res.data;
//       localStorage.setItem('jwtToken', token);

//       // Set token to Auth header
//       setAuthToken(token);
//       const decoded = jwt_decode(token);
//       this.setState({
//         auth: {
//           ...this.state.auth,
//           isAuthenticated: true,
//           user: decoded
//         }
//       });
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   logoutUser = () => {
//     // Log user out
//     localStorage.removeItem('jwtToken');
//     setAuthToken('');
//     this.setState({
//       auth: {
//         ...this.state.auth,
//         isAuthenticated: false,
//         user: null,
//         company: null
//       }
//     });
//   };

//   loginCompany = async companyData => {
//     try {
//       const res = await axios.post('/api/company/login', companyData);
//       // Save token to local storage
//       const { token } = res.data;
//       localStorage.setItem('jwtTokenCompany', token);

//       // Set token to Auth header
//       setAuthToken(token);
//       const decoded = jwt_decode(token);
//       console.log('Setting auth state');
//       await this.setState({
//         auth: {
//           ...this.state.auth,
//           isAuthenticated: true,
//           company: decoded
//         }
//       });
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   logoutCompany = () => {
//     // Log company out
//     localStorage.removeItem('jwtTokenCompany');
//     setAuthToken('');
//     this.setState({
//       auth: {
//         ...this.state.auth,
//         isAuthenticated: false,
//         company: null
//       }
//     });
//   };

//   async componentDidMount() {
//     if (localStorage.jwtToken) {
//       setAuthToken(localStorage.jwtToken);
//       const decoded = jwt_decode(localStorage.jwtToken);

//       const res = await axios.get('http://localhost:3000/api/company');

//       console.log('Setting user');
//       this.setState({
//         companies: res.data,
//         auth: {
//           ...this.state.auth,
//           isAuthenticated: true,
//           user: decoded
//         }
//       });

//       // Check for expired token
//       const currentTime = Date.now() / 1000;
//       if (decoded.exp < currentTime) {
//         // Logout user
//         this.setState({
//           auth: {
//             ...this.state.auth,
//             isAuthenticated: false,
//             user: null
//           }
//         });
//       }
//     } else if (localStorage.jwtTokenCompany) {
//       setAuthToken(localStorage.jwtTokenCompany);
//       const decoded = jwt_decode(localStorage.jwtTokenCompany);

//       console.log('Setting company');

//       this.setState({
//         auth: {
//           ...this.state.auth,
//           isAuthenticated: true,
//           company: decoded
//         }
//       });

//       // Check for expired token
//       const currentTime = Date.now() / 1000;
//       if (decoded.exp < currentTime) {
//         // Logout company
//         this.setState({
//           auth: {
//             ...this.state.auth,
//             isAuthenticated: false,
//             company: null
//           }
//         });
//       }
//     }
//   }

//   render() {
//     return (
//       <AuthContext.Provider value={this.state.auth}>
//         <CompanyContext.Provider value={this.state.companies}>
//           <Router>
//             <Navbar />
//             <div className="container mt-3">
//               <Switch>
//                 <Route exact path="/" component={Landing} />
//                 <Route exact path="/register" component={Register} />
//                 <Route exact path="/login" component={Login} />

//                 <Route
//                   exact
//                   path="/company/register"
//                   component={CompanyRegister}
//                 />
//                 <Route exact path="/company/login" component={CompanyLogin} />
//                 <PrivateRoute exact path="/profile" component={Profile} />
//                 <CompanyPrivateRoute
//                   exact
//                   path="/company/profile"
//                   component={CompanyProfile}
//                 />
//                 <PrivateRoute
//                   exact
//                   path="/permissions/add"
//                   component={AddPermissions}
//                 />
//                 <PrivateRoute
//                   exact
//                   path="/permissions/edit"
//                   component={EditPermissions}
//                 />
//                 <PrivateRoute
//                   exact
//                   path="/companies"
//                   component={CompanyContainer}
//                 />
//               </Switch>
//             </div>
//           </Router>
//         </CompanyContext.Provider>
//       </AuthContext.Provider>
//     );
//   }
// }

// export default App;

const App = () => {
  const [companies, setCompanies] = useState([]);
  const [auth, dispatch] = useReducer(AuthReducer, AuthReducer());

  useEffect(() => {
    async function fetchData() {
      if (localStorage.jwtToken) {
        setAuthToken(localStorage.jwtToken);
        const decoded = jwt_decode(localStorage.jwtToken);

        const res = await axios.get('http://localhost:3000/api/company');

        // this.setState({
        //   companies: res.data,
        //   auth: {
        //     ...this.state.auth,
        //     isAuthenticated: true,
        //     user: decoded
        //   }
        // });

        setCompanies(res.data);
        // dispatch({ type: LOGIN_USER, payload: decoded });
        loginUser(dispatch, decoded);

        // Check for expired token
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          // Logout user
          // this.setState({
          //   auth: {
          //     ...this.state.auth,
          //     isAuthenticated: false,
          //     user: null
          //   }
          // });
          dispatch({ type: LOGOUT });
        }
      } else if (localStorage.jwtTokenCompany) {
        setAuthToken(localStorage.jwtTokenCompany);
        const decoded = jwt_decode(localStorage.jwtTokenCompany);

        // this.setState({
        //   auth: {
        //     ...this.state.auth,
        //     isAuthenticated: true,
        //     company: decoded
        //   }
        // });
        // dispatch({ type: LOGIN_COMPANY, payload: decoded });
        loginCompany(dispatch, decoded);

        // Check for expired token
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          // Logout company
          dispatch({ type: LOGOUT });
        }
      }
    }
    fetchData();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, dispatch }}>
      <CompanyContext.Provider value={companies}>
        <Router>
          <Navbar />
          <div className="container mt-3">
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />

              <Route
                exact
                path="/company/register"
                component={CompanyRegister}
              />
              <Route exact path="/company/login" component={CompanyLogin} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <CompanyPrivateRoute
                exact
                path="/company/profile"
                component={CompanyProfile}
              />
              <PrivateRoute
                exact
                path="/permissions/add"
                component={AddPermissions}
              />
              <PrivateRoute
                exact
                path="/permissions/edit"
                component={EditPermissions}
              />
              <PrivateRoute
                exact
                path="/companies"
                component={CompanyContainer}
              />
            </Switch>
          </div>
        </Router>
      </CompanyContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
