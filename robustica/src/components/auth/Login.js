import React, {Component} from 'react'
import isEmail from 'validator/lib/isEmail'
import {Button, FormControl, Input, InputLabel, Paper, Typography} from '@material-ui/core'
import {Link} from 'react-router-dom'
import * as PropTypes from 'prop-types'
import {withApollo} from 'react-apollo'
import firebaseApp from '../../services/AuthService'
import '../../css/index.css'
import {AUTH_TOKEN, ORGANIZATION_ID, USER_ID} from '../../constants'
import GoogleSignIn from './GoogleSignIn'
import FacebookSignIn from './FacebookSignIn'
import history from '../../utils/history'
import {readCurrentUserQuery} from '../../graphql/userQueries'

class Login extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.loginCallback = this.loginCallback.bind(this)
  }

  loginCallback(user) {
    const {client} = this.props
    localStorage.setItem(USER_ID, user.uid)
    firebaseApp
      .auth()
      .currentUser.getToken()
      .then(token => {
        localStorage.setItem(AUTH_TOKEN, token)
        client.query({query: readCurrentUserQuery}).then(({error, data}) => {
          if (error) {
            // TODO
          } else {
            localStorage.setItem(ORGANIZATION_ID, data.user.currentUser.organizationId)
            history.push('/home')
          }
        })
      })
  }

  handleSubmit(e) {
    const {email, password} = this.state
    e.preventDefault()
    if (isEmail(email)) {
      firebaseApp
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(result => {
          this.loginCallback(result.user)
        })
        .catch(error => {
          // Handle Errors here.
          const errorMessage = error.message
          alert(`errorMessage: ${errorMessage}`)
        })
    } else {
      alert('Email Address is not valid')
    }
  }

  render() {
    return (
      <main>
        <Paper className="centerSquare">
          <Typography component="h6" variant="h5" align="center">
            Login Screen
          </Typography>
          <div align="center">
            <FacebookSignIn callback={this.loginCallback}/>
            <GoogleSignIn callback={this.loginCallback}/>
          </div>
          <form onSubmit={this.handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input type="email" name="email" autoComplete="email" autoFocus/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input type="password" name="password" id="password" autoComplete="current-password"/>
            </FormControl>
            <Button type="submit" fullWidth variant="contained">
              Submit
            </Button>
          </form>
          <p>
            Forgot Password<Link to="/recover"> Click Here</Link>
          </p>
          <p>
            Not Signed up yet? <Link to="/signup"> Sign Up</Link>
          </p>
        </Paper>
      </main>
    )
  }
}

Login.propTypes = {
  client: PropTypes.object.isRequired
}

Login.defaultProps = {}

export default withApollo(Login)
