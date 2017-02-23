import React from 'react'
import { Route, IndexRoute, Redirect, browserHistory } from 'react-router'

import App from 'components/App'
import { HomePage, LoginPage, ListsPage, ArticlePage, CreateArticlePage} from 'components'
import Axios from 'axios'
import cookie from 'react-cookie'


function requireLogIn(nextState, replace) {
  const token = cookie.load('Access-Token');
  console.log("hereeeee");
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
    /*<IndexRoute component={HomePage}/>*/
    <Route path='/personal' component={ListsPage} />
    <Route path="/personal/article" component={ArticlePage} />
    <Route path='/group' component={ListsPage} />
    <Route path="/group/article" component={ArticlePage} />
    <Route path='/login' component={LoginPage} />
    <Route path='/createArticlePage' component={CreateArticlePage} />
    <Route path='/createListPage' component={CreateArticlePage} />
    {/*<Route path='/home' component={HomePage} onEnter={} />*/}
  </Route>
);


export default routes
