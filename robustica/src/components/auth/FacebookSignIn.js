import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import * as firebase from 'firebase'
import firebaseApp from '../../services/AuthService'
import { AUTH_TOKEN, LOGGED_IN_USER_ID } from '../../constants'

export class FacebookSignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      callback: props.callback,
      updateClientCallback: props.updateClientCallback
    }
    this.handleFacebook = this.handleFacebook.bind(this)
  }

  handleFacebook(e) {
    e.preventDefault()
    const provider = new firebase.auth.FacebookAuthProvider()
    const { callback } = this.state
    firebaseApp
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        console.log('Facebook login success')
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
        alert(`Facebook sign in error: ${errorMessage}`)
      })
  }

  render() {
    return <Button onClick={this.handleFacebook}>Sign in with Facebook</Button>
  }
}

FacebookSignIn.propTypes = {
  callback: PropTypes.func.isRequired,
  updateClientCallback: PropTypes.func.isRequired
}
