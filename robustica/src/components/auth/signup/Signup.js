import React, {Component} from 'react'
import {Paper, Typography} from '@material-ui/core'
import {Link} from 'react-router-dom'
import * as PropTypes from 'prop-types'
import {Alert} from 'reactstrap'
import {connect} from 'react-redux'

import EmailPasswordSignUp from './EmailPasswordSignUp'
import GoogleSignIn from '../components/GoogleSignIn'
import FacebookSignIn from '../components/FacebookSignIn'
import history from '../../../utils/history'
import '../../../css/index.css'
import {AUTH_TOKEN, USER_ID} from '../../../constants'
import firebaseApp from '../../../services/AuthService'

class Signup extends Component {
  constructor(props) {
    super(props)
    this.signupCallback = this.signupCallback.bind(this)
  }

  signupCallback(user) {
    localStorage.setItem(USER_ID, user.uid)
    firebaseApp
      .auth()
      .currentUser.getToken()
      .then(token => {
        localStorage.setItem(AUTH_TOKEN, token)
        history.push('/signupcontinued')
      })
  }

  render() {
    const {authError} = this.props

    return (
      <main>
        <Paper className="centerSquare">
          <Typography component="h6" variant="h5" align="center">
            Create New Account
          </Typography>
          <div align="center">
            <FacebookSignIn callback={this.signupCallback}/>
            <GoogleSignIn callback={this.signupCallback}/>
          </div>
          <EmailPasswordSignUp />
          <br/>
          <Alert hidden={!authError} color="danger">{authError}</Alert>
          <p>
            Already Signed up? <Link to="/login">Log In</Link>
          </p>
        </Paper>
      </main>
    )
  }
}

Signup.propTypes = {
  authError: PropTypes.string
}

const mapStateToProps = ({auth}) => {
  return {
    authError: auth.authError
  }
}

export default connect(mapStateToProps)(Signup)
