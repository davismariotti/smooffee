import React, { Component } from 'react'
import * as PropTypes from 'prop-types'
import { compose, graphql } from 'react-apollo'
import { readUserQuery } from '../graphql/userQueries'
import { StorageService } from '../services/StorageService'

class UserInfo extends Component {
  render() {
    const { data } = this.props

    if (data.loading) return <div>Loading User Info...</div>
    if (data.error) return <div>Error :(</div>

    const user = data.user.read

    return (
      <div>
        <p>
          {user.firstName} {user.lastName}
        </p>
        <p>{user.email}</p>
        <p>Account Balance: {user.balance}</p>
      </div>
    )
  }
}

UserInfo.propTypes = {
  data: PropTypes.object
}

UserInfo.defaultProps = {
  data: {}
}

export default compose(
  graphql(readUserQuery, {
    options: {
      variables: {
        userId: StorageService.getUserId()
      }
    }
  })
)(UserInfo)