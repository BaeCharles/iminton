import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';

import Main from './container/Main';
import Attendance from './container/Attendance';
import Join from './container/Join';
import Login from './container/Login';
import Member from './container/Member';
import User from './container/User';

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Main} />
        <Route path="/attendance" component={Attendance} />
        <Route path="/member" component={Member} />
        <Route path="/user" component={User} />
        <Route path="/join" component={Join} />
        <Route path="/login" component={Login} />
      </Router>
    );
  }
}

export default App;