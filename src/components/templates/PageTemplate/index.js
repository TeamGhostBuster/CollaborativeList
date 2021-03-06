import React from 'react';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';

function requireLogIn() {
  const token = localStorage.token;
  if (token === undefined) {
    browserHistory.push('/login');
  } else {
    const url = `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {

        const response = JSON.parse(xhr.response);
        if (response.email){
          localStorage.cl_email = response.email;
        }
        if (response.error === 'invalid_token') {
          console.log('invalid token');
          delete localStorage.token;
          delete localStorage.cl_email;
          browserHistory.push('/login');
        }
      } else if (xhr.readyState == 4) {
        console.log('invalide http request');
        browserHistory.push('/login');
      }
    };
    xhr.send(null);
  }
}

// it's just a base container that requires login before rendering
const PageTemplate = (props) => {
  requireLogIn();

  return (
    <div {...props} />
  );
};

export default PageTemplate;
