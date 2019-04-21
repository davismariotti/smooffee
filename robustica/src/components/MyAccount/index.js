import React, { Component } from 'react'
import { Paper } from '@material-ui/core'
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

class MyAccount extends Component {
  render() {
    const {readCurrentUserQueryResult, updateUserMutate, reinitializeForm} = this.props

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

    return (
      <div>
        {readCurrentUserQueryResult.loading && (
          <CenterDiv>
            <Loader type="line-scale" active color="black"/>
          </CenterDiv>
        )}
        {readCurrentUserQueryResult.error && <div>Error</div>}
        {readCurrentUserQueryResult.user && readCurrentUserQueryResult.user.currentUser && (
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
        )}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    reinitializeForm: (newData) => dispatch(initialize('myAccountForm', newData))
  }
}

export default compose(
  connect(null, mapDispatchToProps),
  graphql(readCurrentUserQuery, {
    name: 'readCurrentUserQueryResult'
  }),
  graphql(updateUserMutation, {
    name: 'updateUserMutate'
  })
)(MyAccount)