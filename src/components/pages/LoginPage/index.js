import React from 'react';
import GoogleLogin from 'react-google-login';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import { Card, CardTitle } from 'material-ui/Card';

// callback function after login
const success = (response) => {
  console.log('Login in');
  // save Google Oauth2 access token into cookie
  localStorage.token = response.accessToken;
  browserHistory.push('/');
};

// callback function when fail to login
const error = (response) => {
  console.log('Fail to login', response);
};

function checkLogIn() {
  const token = localStorage.token;
  if (token !== undefined) {
    const url = `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.response);
        if (response.aud !== undefined) {
          browserHistory.goBack();
        }
      }
    };
    xhr.send(null);
  }
}


export default class LoginPage extends React.Component {

  render() {
    checkLogIn();
    const styles = {
      height: 500,
      // width: 500,
      margin: 20,
      textAlign: 'center',
      justifyContent: 'space-around',
    };
    const GOOGLE_CLIENT_ID = '224926533228-4jcfs0862eib0vo9j81b9d6h8agqh30f.apps.googleusercontent.com';
    return (
      <div>
        <AppBar title="LogIn Page" iconElementLeft={<div />} />
        <Card style={styles}>
          <CardTitle title="To Use CollaborativeList " style={{ paddingTop: 100, paddingBottom: 30 }} />
          <CardTitle title="You Need To Be Logged In " style={{ paddingTop: 30, paddingBottom: 60 }} />


          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            onSuccess={success}
            onFailure={error}
            buttonText="Login with Google"
          />

        </Card>

      </div>

    );
  }
}
