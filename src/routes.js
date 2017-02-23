import React from 'react'
import { Route, IndexRoute, browserHistory } from 'react-router'

import App from 'components/App'
import { HomePage, LoginPage, ListsPage, ArticlePage} from 'components'



const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={HomePage}/>
    /*<IndexRoute component={HomePage}/>*/
    <Route path='/personal' component={ListsPage}/>
    <Route path="/personal/article" component={ArticlePage} />
    <Route path='/group' component={ListsPage} />
    <Route path="/group/article" component={ArticlePage} />
    <Route path='/login' component={LoginPage} />
    {/*<Route path='/home' component={HomePage} onEnter={} />*/}
  </Route>
);


export default routes
