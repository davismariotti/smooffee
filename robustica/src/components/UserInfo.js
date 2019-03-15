import React, {Component} from 'react'
import {Query} from 'react-apollo'
import {gql} from 'apollo-boost'
import {USER_ID} from '../constants'

const USER_READ_QUERY = gql`
  query UserRead($userId: String!) {
    user {
      read(id: $userId) {
        id
        firstName
        lastName
        email
        balance
        organizationId
      }
    }
  }
`

export default class UserInfo extends Component {
  render() {
    return (
      <Query query={USER_READ_QUERY} variables={{userId: localStorage.getItem(USER_ID)}}>
        {({loading, error, data}) => {
          if (loading) return <div>Loading User Info...</div>
          if (error) return <div>Error :(</div>

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
        }}
      </Query>
    )
  }
}
