import React from 'react'
import { PageTemplate } from 'components'
import GoogleLogin from 'react-google-login'

const success = (response) => {
  console.log(response)
}

const error = (response) => {
  console.log('Fail to login')
}

const LoginPage = () => {
  console.log('Rendering login page')
  return (
    <GoogleLogin
      clientId='224926533228-4jcfs0862eib0vo9j81b9d6h8agqh30f.apps.googleusercontent.com'
      onSuccess={success}
      onFailure={error}
      buttonText='Login with Google'
      />
  )
}

export default LoginPage
