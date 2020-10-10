/*
* All routes imported here in app component.
*/

import '../App.scss';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  Home,
  Worker,
  Requester
} from './index';

const App = () => (
  <div>
    <Router>
      <Switch>
        {/* Primary Route */}
        <Route exact path="/" component={Home} />

        {/* Secondary Route */}
        {/* Secondary Route */}
        <Route exact path="/worker-page" component={Worker} />
        <Route exact path="/requester-page" component={Requester} />
      </Switch>
    </Router>
  </div>
);

export default App;
