import React, { Component } from 'react'
import { Button, Paper } from '@material-ui/core'
import { compose } from 'redux'
import { graphql } from 'react-apollo'
import Loader from 'react-loaders'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import { initialize } from 'redux-form'

import { AlignCenter, CenterDiv } from '../styles/core'
import { readCurrentUserQuery, updateUserMutation } from '../../graphql/userQueries'
import MyAccountForm from './MyAccountForm'
import { StorageService } from '../../services/StorageService'
import MyAccountActions from './actions'
import { AuthService } from '../../services/AuthService'

class MyAccount extends Component {
  constructor(props) {
    super(props)
    this.renderPasswordReset = this.renderPasswordReset.bind(this)
  }


  renderPasswordReset() {

  }

  render() {
    const {readCurrentUserQueryResult, updateUserMutate, reinitializeForm, doResetPasswordLinkSent, resetPasswordLinkSent} = this.props

    const submit = ({firstName, lastName}) => {
      updateUserMutate({
        variables: {
          userId: StorageService.getUserId(),
          userInput: {
            firstName,
            lastName
          }
        }
      }).then(() => {
        return readCurrentUserQueryResult.refetch()
      }).then((newData) => {
        if (newData && newData.data) {
          reinitializeForm(newData.data.user.currentUser)
        }
      })
    }

    const resetPassword = () => {
      AuthService.sendPasswordResetEmail(AuthService.getEmail()).then(() => {
        console.log('Sent password reset email')
        doResetPasswordLinkSent()
      }).catch(error => {
        console.log('resetPassword error', error)
      })
    }

    return (
      <div>
        {readCurrentUserQueryResult.loading && (
          <CenterDiv>
            <Loader type="line-scale" active color="black"/>
          </CenterDiv>
        )}
        {readCurrentUserQueryResult.error && <div>Error</div>}
        {readCurrentUserQueryResult.user && readCurrentUserQueryResult.user.currentUser && (
          <div>
            <Paper className="paper" elevation={1}>
              <AlignCenter>
                <Typography variant="h5">Hi {readCurrentUserQueryResult.user.currentUser.firstName} {readCurrentUserQueryResult.user.currentUser.lastName}</Typography>
                Your balance is {`$${(readCurrentUserQueryResult.user.currentUser.balance / 100).toFixed(2)}`}
                <br/>
                <br/>
                <br/>
                <MyAccountForm initialValues={readCurrentUserQueryResult.user.currentUser} onSubmit={submit}/>
              </AlignCenter>
            </Paper>
            {AuthService.getProviderId() && (AuthService.getProviderId() === 'password') && (
              <Paper className="paper" elevation={1}>
                <AlignCenter>
                  <Typography variant="h5">Change Password</Typography>
                  Click the button below to receive an email link at {readCurrentUserQueryResult.user.currentUser.email} to reset your password.
                  <br />
                  {resetPasswordLinkSent && (
                    <div>
                      Sent!
                      <br />
                    </div>
                  )}
                  <Button style={{marginTop: '10px'}} variant="contained" onClick={resetPassword}>Reset Password</Button>
                </AlignCenter>
              </Paper>
            )}
          </div>
        )}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    reinitializeForm: (newData) => dispatch(initialize('myAccountForm', newData)),
    doResetPasswordLinkSent: () => dispatch(MyAccountActions.resetPasswordLinkSent())
  }
}

const mapStateToProps = ({myaccount}) => {
  return {
    resetPasswordLinkSent: myaccount.resetPasswordLinkSent
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(readCurrentUserQuery, {
    name: 'readCurrentUserQueryResult'
  }),
  graphql(updateUserMutation, {
    name: 'updateUserMutate'
  })
)(MyAccount)