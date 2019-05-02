import React, { Component } from 'react'
import { Button, Paper, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import * as PropTypes from 'prop-types'
import { Alert } from 'reactstrap'
import { connect } from 'react-redux'

import EmailPasswordSignUp from './EmailPasswordSignUp'
import '../../../css/index.css'
import { AlignCenter, MainCenterDiv } from '../../styles/core'
import AuthMiddleware from '../AuthMiddleware'

class Signup extends Component {
  render() {
    const { authError, signInWithGoogle } = this.props

    return (
      <main>
        <MainCenterDiv>
          <Paper className="centerSquare">
            <Typography component="h6" variant="h5" align="center">
              Create New Account
            </Typography>
            <AlignCenter>
              <Button onClick={signInWithGoogle}>
                Sign Up With Google
              </Button>
            </AlignCenter>
            <EmailPasswordSignUp/>
            <br/>
            <Alert hidden={!authError} color="danger">{authError}</Alert>
            <Typography align="center">
              Already Signed up? <Link to="/login">Log In</Link>
            </Typography>
          </Paper>
        </MainCenterDiv>
      </main>
    )
  }
}

Signup.propTypes = {
  authError: PropTypes.string,
  signInWithGoogle: PropTypes.func.isRequired
}

const mapStateToProps = ({ auth }) => {
  return {
    authError: auth.authError
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signInWithGoogle: () => AuthMiddleware.signInWithGoogle()(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
