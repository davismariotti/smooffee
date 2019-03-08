import * as firebase from 'firebase';
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import firebaseApp from '../../services/AuthService';
import {AUTH_TOKEN, LOGGED_USER_ID} from '../../constants'

export class GoogleSignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      callback: props.callback,
      updateClientCallback: props.updateClientCallback
    }
    this.handleGoogle = this.handleGoogle.bind(this)
  }

  handleGoogle(e) {
    const { callback } = this.state
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebaseApp
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        console.log('Google login success');
        const {updateClientCallback} = this.state
        localStorage.setItem(LOGGED_USER_ID, result.user.uid)
        firebaseApp.auth().currentUser.getToken().then((token) => {
          localStorage.setItem(AUTH_TOKEN, token)
          callback()
          updateClientCallback()
        })
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

GoogleSignIn.propTypes = {
  callback: PropTypes.func.isRequired,
  updateClientCallback: PropTypes.func.isRequired
}