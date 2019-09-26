import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Main from '../container/Main';
import Join from '../container/Join';
import Login from '../container/Login';
import Member from '../container/Member';
import Attendance from '../container/Attendance';
import User from '../container/User';

export default () => (
    <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/attendance" component={Attendance} />
        <Route exact path="/join" component={Join} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/member" component={Member} />
        <Route exact path="/user" component={User} />
        <Redirect from="*" to="/" />
    </Switch>
);