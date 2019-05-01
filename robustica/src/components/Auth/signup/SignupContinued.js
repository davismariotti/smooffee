import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Button, Paper, Typography } from '@material-ui/core'
import { compose } from 'redux'
import { Field, propTypes, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import { connect } from 'react-redux'
import history from '../../../utils/history'
import { signUpMutation } from '../../../graphql/userQueries'
import { StorageService } from '../../../services/StorageService'
import { StyledFormRow, StyledFormRowItem } from '../../styles/forms'
import { validateIsRequired } from '../../../utils/formUtils'
import { AlignCenter, MainCenterDiv } from '../../styles/core'
import AuthActions from '../actions'

class SignupContinued extends Component {
  render() {

    const { signUpMutate, handleSubmit, signInError } = this.props

    const submit = ({ firstName, lastName }) => {

      const userInput = {
        firstName,
        lastName
      }

      signUpMutate({
        variables: {
          organizationId: 3, // TODO
          userInput
        }
      }).then((result) => {
        console.log('user', result)
        StorageService.setOrganizationId(result.data.user.create.organizationId)
        StorageService.setUserRole(result.data.user.create.role)
        signInError('Your account is created, but you must login with the mobile app.')
        history.push('/')
      })
    }

    return (
      <main>
        <MainCenterDiv>
          <Paper className="centerSquare">
            <AlignCenter>
              <Typography variant="h5" component="h3">We need a little more information...</Typography>
            </AlignCenter>
            <form onSubmit={handleSubmit(submit)}>
              <StyledFormRow>
                <StyledFormRowItem>
                  <Field fullWidth name="firstName" component={TextField} validate={validateIsRequired} label="First Name"/>
                </StyledFormRowItem>
              </StyledFormRow>
              <StyledFormRow>
                <StyledFormRowItem>
                  <Field fullWidth name="lastName" component={TextField} validate={validateIsRequired} label="Last Name"/>
                </StyledFormRowItem>
              </StyledFormRow>
              <StyledFormRow>
                <StyledFormRowItem>
                  <Button fullWidth type="submit" variant="contained">Submit</Button>
                </StyledFormRowItem>
              </StyledFormRow>
            </form>
          </Paper>
        </MainCenterDiv>
      </main>
    )
  }
}

SignupContinued.propTypes = {
  ...propTypes
}

const mapDispatchToProps = dispatch => {
  return {
    signInError: (error) => dispatch(AuthActions.signInError(error))
  }
}

export default compose(
  connect(null, mapDispatchToProps),
  graphql(signUpMutation, {
    name: 'signUpMutate'
  }),
  reduxForm({
    form: 'signUpContinued'
  })
)(SignupContinued)
