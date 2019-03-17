import React, {Component} from 'react'
import * as PropTypes from 'prop-types'
import {Paper, Typography} from '@material-ui/core'
import {Link} from 'react-router-dom'
import {EmailPasswordSignUp} from './EmailPasswordSignUp'
import GoogleSignIn from './GoogleSignIn'
import FacebookSignIn from './FacebookSignIn'
import history from '../../utils/history'
import '../../css/index.css'
import {USER_ID} from '../../constants'
import firebaseApp from '../../services/AuthService'

class Signup extends Component {
  constructor(props) {
    super(props)
    this.signupCallback = this.signupCallback.bind(this)
  }

  signupCallback(user) {
    const {updateClientCallback} = this.props
    localStorage.setItem(USER_ID, user.uid)
    firebaseApp
      .auth()
      .currentUser.getToken()
      .then(token => {
        updateClientCallback(token).then(() => {
          history.push('/signupcontinued')
        })
      })
  }

  render() {
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
          <EmailPasswordSignUp callback={this.signupCallback}/>
          <br/>
          <p>
            Already Signed up? <Link to="/login">Log In</Link>
          </p>
        </Paper>
      </main>
    )
  }
}

Signup.propTypes = {
  updateClientCallback: PropTypes.func.isRequired
}

export default Signup
