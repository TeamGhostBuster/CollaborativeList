import React from 'react'
import { Route, IndexRoute, Redirect, browserHistory } from 'react-router'

import App from 'components/App'
import { HomePage, LoginPage } from 'components'

import cookie from 'react-cookie'


function requireLogIn(nextState, replace) {
  const token = cookie.load('Access-Token');
  if (token === undefined){
    browserHistory.push('/login')
  } else {
    const url = 'https://www.googleapis.com/oauth2/v3/tokeninfo?access_token='+token;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.onreadystatechange = function(){
      if (xhr.readyState == 4 && xhr.status == 200){
        var response = JSON.parse(xhr.response);
        if (response['error']==='invalid_token'){
          console.log('invalid token');
          browserHistory.push('/login')
        } else {
          console.log(xhr.responseText);
        }
      } else if (xhr.readyState == 4){
        console.log("invalide http request");
        browserHistory.push('/login')
      }
    };
    xhr.send(null);
  }

}


const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={HomePage} onEnter={requireLogIn}/>
    <Route path='/login' component={LoginPage} />
    {/*<Route path='/home' component={HomePage} onEnter={} />*/}
  </Route>
);


export default routes
