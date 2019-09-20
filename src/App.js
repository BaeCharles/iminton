import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Main from './container/Main';
import Join from './container/Join';
import Login from './container/Login';
import Member from './container/Member';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Main} />
          <Route path="/join" component={Join} />
          <Route path="/login" component={Login} />
          <Route path="/member" component={Member} />
        </div>
      </Router>
    );
  }
}

export default App;