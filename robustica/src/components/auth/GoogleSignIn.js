import * as firebase from 'firebase';
import React, { Component } from 'react';
import firebaseApp from '../../services/AuthService';
import history from '../../utils/robusticaHistory'

export class GoogleSignIn extends Component {
  handleGoogle(e) {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebaseApp
      .auth()
      .signInWithPopup(provider)
      .then(() => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = result.credential.accessToken;
        // The signed-in user info.
        // var user = result.user;
        console.log('Google login success');
        history.push('/home')
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(`Google sign in error: ${  errorMessage}`);
      });
  }

  render() {
    return (
      <button type="submit" className="btn btn-block btn-social btn-google" onClick={this.handleGoogle}>
        <span className="fa fa-google"/>
        Sign in with Google
      </button>
    );
  }
}