import React, { Component } from 'react'
import { Button, Paper, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import * as PropTypes from 'prop-types'
import { Field, propTypes, reduxForm } from 'redux-form'
import { compose } from 'redux'
import { TextField } from 'redux-form-material-ui'
import { connect } from 'react-redux'
import { Alert } from 'reactstrap'

import '../../../css/index.css'
import AuthMiddleware from '../AuthMiddleware'
import { AlignCenter, MainCenterDiv } from '../../styles/core'
import { StyledFormRow } from '../../styles/forms'
import { validateIsRequired } from '../../../utils/formUtils'

class Login extends Component {
  render() {
    const {handleSubmit, authError, signInWithEmailAndPassword, signInWithGoogle} = this.props

    const submit = ({email, password}) => {
      signInWithEmailAndPassword(email, password)
    }

    return (
      <main>
        <MainCenterDiv>
          <Paper className="centerSquare">
            <Typography component="h6" variant="h5" align="center">
              Login Screen
            </Typography>
            <AlignCenter>
              <Button onClick={signInWithGoogle}>Sign In With Google</Button>
            </AlignCenter>
            <form onSubmit={handleSubmit(submit)}>
              <StyledFormRow>
                <Field fullWidth name="email" type="email" autoComplete="email" component={TextField} validate={validateIsRequired} label="Email"/>
              </StyledFormRow>
              <StyledFormRow>
                <Field fullWidth name="password" type="password" component={TextField} validate={validateIsRequired} label="Password"/>
              </StyledFormRow>
              <StyledFormRow>
                <Button type="submit" fullWidth variant="contained" style={{marginTop: '20px'}}>Submit</Button>
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
    signInWithEmailAndPassword: (email, password) => AuthMiddleware.signInWithEmailAndPassword(email, password)(dispatch),
    signInWithGoogle: () => AuthMiddleware.signInWithGoogle()(dispatch)
  }
}

export default compose(
  reduxForm({
    form: 'login'
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(Login)
