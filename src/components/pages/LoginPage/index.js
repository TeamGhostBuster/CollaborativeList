import React from 'react'
import { PageTemplate } from 'components'
import GoogleLogin from 'react-google-login'
import cookie from 'react-cookie'
import {browserHistory} from 'react-router'
import AppBar from 'material-ui/AppBar'
import Paper from 'material-ui/Paper'
import {Card, CardMedia, CardTitle, CardActions, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'


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

function checkLogIn() {
  const token = cookie.load('Access-Token');
  if (token !== undefined) {
    const url = 'https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=' + token;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var response = JSON.parse(xhr.response);
        if (response['aud'] !== undefined) {
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
      //width: 500,
      margin: 20,
      textAlign: 'center',
      justifyContent: 'space-around',
    };
    const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '224926533228-4jcfs0862eib0vo9j81b9d6h8agqh30f.apps.googleusercontent.com'
    return (
      <div>
        <AppBar title="LogIn Page" iconElementLeft={<div></div>}/>
        <Card style={styles}>
          <CardTitle title="To Use CollaborativeList " style={{paddingTop:100, paddingBottom:30}}/>
          <CardTitle title="You Need To Be Logged In " style={{paddingTop:30, paddingBottom:60}}/>


            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              onSuccess={success}
              onFailure={error}
              buttonText='Login with Google'
            />

        </Card>

      </div>

    );
  }
}
