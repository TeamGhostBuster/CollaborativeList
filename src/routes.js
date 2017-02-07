import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

import App from 'components/App'
import { HomePage, LoginPage } from 'components'

const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={HomePage} />
    <Route path='/login' component={LoginPage} />
    {/*<Route path='/home' component={HomePage} onEnter={} />*/}
  </Route>
)

export default routes
