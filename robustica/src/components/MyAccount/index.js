import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Paper } from '@material-ui/core'
import { compose } from 'redux'
import { graphql } from 'react-apollo'
import Loader from 'react-loaders'

import Typography from '@material-ui/core/Typography'
import { AlignCenter, CenterDiv } from '../styles/core'
import { readCurrentUserQuery } from '../../graphql/userQueries'

class MyAccount extends Component {
  render() {
    const { readCurrentUserQueryResult } = this.props
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
              <Typography variant="h5">Balance: {`$${(readCurrentUserQueryResult.user.currentUser.balance / 100).toFixed(2)}`}</Typography>
              <Typography variant="h5">Role: {readCurrentUserQueryResult.user.currentUser.role}</Typography>
              <Typography variant="h5">Email: {readCurrentUserQueryResult.user.currentUser.email}</Typography>
            </AlignCenter>
          </Paper>
        )}
      </div>
    )
  }
}


const mapStateToProps = state => ({})

export default compose(
  connect(mapStateToProps),
  graphql(readCurrentUserQuery, {
    name: 'readCurrentUserQueryResult'
  })
)(MyAccount)