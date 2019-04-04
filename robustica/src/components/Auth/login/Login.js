import React, { Component } from 'react'
import { Button, Paper, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import * as PropTypes from 'prop-types'
import { withApollo } from 'react-apollo'
import { Field, propTypes, reduxForm } from 'redux-form'
import { compose } from 'redux'
import { TextField } from 'redux-form-material-ui'
import { connect } from 'react-redux'
import { Alert } from 'reactstrap'
import { withStyles } from '@material-ui/core/styles'
import * as firebaseApp from 'firebase'

import '../../../css/index.css'
import GoogleSignIn from '../components/GoogleSignIn'
import FacebookSignIn from '../components/FacebookSignIn'
import AuthMiddleware from '../AuthMiddleware'
import { AUTH_TOKEN, ORGANIZATION_ID, USER_ID } from '../../../constants'
import { readCurrentUserQuery } from '../../../graphql/userQueries'
import history from '../../../utils/history'
import { MainCenterDiv, StyledFormRow } from '../../styles'

const styles = {
  loginSubmit: {
    marginTop: '20px'
  }
}

class Login extends Component {
  constructor(props) {
    super(props)
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

  render() {
    const {handleSubmit, authError, classes, signInWithEmailAndPassword} = this.props

    const submit = ({email, password}) => {
      console.log('test')
      signInWithEmailAndPassword(email, password)
    }

    return (
      <main>
        <MainCenterDiv>
          <Paper className="centerSquare">
            <Typography component="h6" variant="h5" align="center">
              Login Screen
            </Typography>
            <div align="center">
              <FacebookSignIn callback={this.loginCallback}/>
              <GoogleSignIn callback={this.loginCallback}/>
            </div>
            <form onSubmit={handleSubmit(submit)}>
              <StyledFormRow>
                <Field fullWidth name="email" type="email" autoComplete="email" component={TextField} label="Email"/>
              </StyledFormRow>
              <StyledFormRow>
                <Field fullWidth name="password" type="password" component={TextField} label="Password"/>
              </StyledFormRow>
              <StyledFormRow>
                <Button type="submit" fullWidth variant="contained" className={classes.loginSubmit}>Submit</Button>
              </StyledFormRow>
            </form>
            <br/>
            <Alert hidden={!authError} color="danger">{authError}</Alert>
            <p>Forgot Password <Link to="/recover"> Click Here</Link></p>
            <p>Not Signed up yet? <Link to="/signup"> Sign Up</Link></p>
          </Paper>
        </MainCenterDiv>
      </main>
    )
  }
}

Login.propTypes = {
  ...propTypes,
  client: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  authError: PropTypes.string
}

const mapStateToProps = ({auth}) => {
  return {
    authError: auth.authError
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signInWithEmailAndPassword: (email, password) => AuthMiddleware.signInWithEmailAndPassword(email, password)(dispatch)
  }
}

export default compose(
  reduxForm({
    form: 'login'
  }),
  connect(mapStateToProps, mapDispatchToProps),
  withApollo,
  withStyles(styles)
)(Login)
