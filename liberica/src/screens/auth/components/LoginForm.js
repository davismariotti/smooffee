import React, { Component } from 'react'
import LoginFormRF from './LoginFormRF'
import AuthMiddleware from '../middleware/AuthMiddleware'
import { connect } from 'react-redux'

class LoginForm extends Component {
  render() {

    const {signInWithEmailAndPassword} = this.props

    const submit = ({email, password}) => {
      signInWithEmailAndPassword(email, password)
    }

    return <LoginFormRF onSubmit={submit}/>
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signInWithEmailAndPassword: (email, password) => AuthMiddleware.signInWithEmailAndPassword(email, password)(dispatch)
  }
}

export default connect(null, mapDispatchToProps)(LoginForm)
