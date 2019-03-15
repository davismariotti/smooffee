import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import firebaseApp from '../services/AuthService'
import { LOGGED_IN_USER_ID } from '../constants'

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
////TODO update organization id dynamically
// function SchoolName(props) {
//   return props.id
//    switch (props.id) {
//      case 0:
//        return <p>Testing Organization</p>
//      case 3:
//        return <p>Northwest Christian High School</p>
//      default:
//        return <p>Organization Unknown!</p>
//    }
// }

export default class UserInfo extends Component {
  render() {
    return (
      <Query
        query={USER_READ_QUERY}
        variables={{ userId: localStorage.getItem(LOGGED_IN_USER_ID) }}
      >
        {({ loading, error, data }) => {
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
