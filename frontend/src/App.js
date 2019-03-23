import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CompanyContainer from './components/company/CompanyContainer';
import Navbar from './components/Navbar';

class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/companies" component={CompanyContainer} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
