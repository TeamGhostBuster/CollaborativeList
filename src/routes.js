import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from 'components/App';
import { LoginPage, PersonalListsPage, GroupListsPage, GroupListsPage2, SearchPage } from 'components';

const routes = (
<Route path="/" component={App}>
    <IndexRoute component={PersonalListsPage} />
    <Route path="/personal" component={PersonalListsPage} />
    <Route path="/group" component={GroupListsPage}/>
    <Route path="/group2" component={GroupListsPage2}/>
  <Route path="/login" component={LoginPage} />
  <Route path="/search" component={SearchPage} />
</Route>
);

export default routes;
