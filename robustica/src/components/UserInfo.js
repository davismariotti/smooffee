import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import firebaseApp from '../services/AuthService';

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
`;

export default class UserInfo extends Component {

  render() {
    console.log('current', firebaseApp.auth().currentUser)
    return (
      <Query query={USER_READ_QUERY} variables={{ userId: firebaseApp.auth().currentUser.uid }}>
        {({ loading, error, data }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error :(</div>;

          const user = data.user.read;
          return (
            <div className="userInfo">
              <p>
                First Name: {user.firstName}
              </p>
              <p>
                Last name: {user.lastName}
              </p>
              <p>
                Email: {user.email}
              </p>
              <p>
                Balance: {user.balance}
              </p>
              <p>
                Organization Id: {user.organizationId}
              </p>
            </div>
          );
        }}
      </Query>
    );
  }
}
