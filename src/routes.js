import React from 'react';
import { Route, IndexRoute, browserHistory } from 'react-router';

import App from 'components/App';
import { HomePage, LoginPage, PersonalListsPage, GroupListsPage, SearchPage } from 'components';


const routes = (

  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
      /*<IndexRoute component={HomePage} />*/
      <Route path="/personal" component={PersonalListsPage} />
    <Route path="/group" component={GroupListsPage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/search" component={SearchPage} />
    {/* <Route path='/home' component={HomePage} onEnter={} />*/}

  </Route>
);


export default routes;
