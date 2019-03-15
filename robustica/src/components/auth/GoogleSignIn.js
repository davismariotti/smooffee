import * as firebase from 'firebase'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import firebaseApp from '../../services/AuthService'
import { AUTH_TOKEN, LOGGED_IN_USER_ID } from '../../constants'

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
    e.preventDefault()
    const provider = new firebase.auth.GoogleAuthProvider()
    firebaseApp
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        console.log('Google login success')
        const { updateClientCallback } = this.state
        localStorage.setItem(LOGGED_IN_USER_ID, result.user.uid)
        firebaseApp
          .auth()
          .currentUser.getToken()
          .then(token => {
            localStorage.setItem(AUTH_TOKEN, token)
            callback()
            updateClientCallback()
          })
      })
      .catch(error => {
        const errorMessage = error.message
        alert(`Google sign in error: ${errorMessage}`)
      })
  }

  render() {
    return <Button onClick={this.handleGoogle}>Sign in with Google</Button>
  }
}

GoogleSignIn.propTypes = {
  callback: PropTypes.func.isRequired,
  updateClientCallback: PropTypes.func.isRequired
}
