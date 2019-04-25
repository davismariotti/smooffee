import React, { Component } from "react"
import LoginFormRF from "./LoginFormRF"
import firebase from 'react-native-firebase'

class LoginForm extends Component {
  handleSubmit = values => {
    console.log("Submitted", values)
    firebase.auth().signInWithEmailAndPassword(values.email, values.password).then((user) =>
      console.log('user', user)
    )
  }
  render() {
    return <LoginFormRF onSubmit={this.handleSubmit} />
  }
}

export default LoginForm