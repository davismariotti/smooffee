import React, {Component} from 'react'
import Button from '@material-ui/core/Button'
import * as PropTypes from 'prop-types'
import * as firebase from 'firebase'
import firebaseApp from '../../../services/AuthService'

class FacebookSignIn extends Component {
  constructor(props) {
    super(props)
    this.handleFacebook = this.handleFacebook.bind(this)
  }

  handleFacebook(e) {
    e.preventDefault()
    const {callback} = this.props
    firebaseApp
      .auth()
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(result => {
        console.log('Facebook login success')
        callback(result.user)
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
  callback: PropTypes.func.isRequired
}

export default FacebookSignIn
