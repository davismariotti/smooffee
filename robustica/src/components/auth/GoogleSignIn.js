import * as firebase from 'firebase'
import React, {Component} from 'react'
import * as PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import firebaseApp from '../../services/AuthService'

class GoogleSignIn extends Component {
  constructor(props) {
    super(props)
    this.handleGoogle = this.handleGoogle.bind(this)
  }

  handleGoogle(e) {
    const {callback} = this.props
    e.preventDefault()
    firebaseApp
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(result => {
        console.log('Google login success')
        callback(result.user)
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
  callback: PropTypes.func.isRequired
}

export default GoogleSignIn