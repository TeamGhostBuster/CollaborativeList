import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from 'components/App'
import { HomePage, LoginPage } from 'components'

const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={HomePage} />
    <Route path='/login' component={LoginPage} />
    <Redirect from='/login' to='/' />
  </Route>
)

export default routes
