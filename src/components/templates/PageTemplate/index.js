import React from 'react'
import cookie from 'react-cookie'
import { browserHistory } from 'react-router'

function requireLogIn() {
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

const PageTemplate = (props) => {
  requireLogIn()
  return (
    <div {...props} >
    </div>
  )
};

export default PageTemplate
