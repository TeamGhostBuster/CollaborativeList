import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'components/App';
import { LoginPage, PersonalListsPage, GroupListsPage } from 'components';


const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={PersonalListsPage} />
    <Route path="/personal" component={PersonalListsPage} />
    <Route path="/group" component={GroupListsPage} />
    <Route path="/login" component={LoginPage} />
  </Route>
);


export default routes;
