import React from 'react'
import { PageTemplate } from 'components'
import GoogleLogin from 'react-google-login'
import cookie from 'react-cookie'
import {browserHistory} from 'react-router'

// callback function after login
const success = (response) => {
  console.log('Login in');
  // save Google Oauth2 access token into cookie
  cookie.save('Access-Token', response.accessToken);
  browserHistory.push('/');

};

// callback function when fail to login
const error = (response) => {
  console.log('Fail to login');
};



const LoginPage = () => {

  return (
    <GoogleLogin
      clientId='224926533228-4jcfs0862eib0vo9j81b9d6h8agqh30f.apps.googleusercontent.com'
      onSuccess={success}
      onFailure={error}
      buttonText='Login with Google'
      />
  )
};

export default LoginPage
