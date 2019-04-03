import React, {Component} from 'react'
import {Button, Paper, Typography} from '@material-ui/core'
import {Link} from 'react-router-dom'
import * as PropTypes from 'prop-types'
import {withApollo} from 'react-apollo'
import {Field, propTypes, reduxForm} from 'redux-form'
import {bindActionCreators, compose} from 'redux'
import {TextField} from 'redux-form-material-ui'
import {connect} from 'react-redux'
import {Alert} from 'reactstrap'
import {withStyles} from '@material-ui/core/styles'

import '../../../css/index.css'
import GoogleSignIn from '../components/GoogleSignIn'
import FacebookSignIn from '../components/FacebookSignIn'
import AuthMiddleware from '../AuthMiddleware'

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
  //   const {client} = this.props
  //   localStorage.setItem(USER_ID, user.uid)
  //   firebaseApp
  //     .auth()
  //     .currentUser.getToken()
  //     .then(token => {
  //       localStorage.setItem(AUTH_TOKEN, token)
  //       client.query({query: readCurrentUserQuery}).then(({error, data}) => {
  //         if (error) {
  //           // TODO
  //         } else {
  //           localStorage.setItem(ORGANIZATION_ID, data.user.currentUser.organizationId)
  //           history.push('/home')
  //         }
  //       })
  //     })
  }

  render() {
    const {handleSubmit, loginError, classes, signInWithEmailAndPassword} = this.props

    const submit = ({email, password}) => {
      console.log('test')
      signInWithEmailAndPassword(email, password)
    }

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
          <form onSubmit={handleSubmit(submit)}>
            <Field fullWidth name="email" type="email" component={TextField} label="Email"/>
            <Field fullWidth name="password" type="password" component={TextField} label="Password"/>
            <Button type="submit" fullWidth variant="contained" className={classes.loginSubmit}>
              Submit
            </Button>
          </form>
          <br/>
          <Alert hidden={!loginError} color="danger">{loginError}</Alert>
          <p>Forgot Password <Link to="/recover"> Click Here</Link></p>
          <p>Not Signed up yet? <Link to="/signup"> Sign Up</Link></p>
        </Paper>
      </main>
    )
  }
}

Login.propTypes = {
  ...propTypes,
  client: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  loginError: PropTypes.string
}

const mapStateToProps = ({auth}) => {
  return {
    loginError: auth.loginError
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
