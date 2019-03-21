import {gql} from 'apollo-boost'

export const readUserQuery = gql`
query ReadUser($userId: String!) {
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

export const readCurrentUserQuery = gql`
query ReadCurrentUser {
  user {
    currentUser {
      id
      organizationId
    }
  }
}
`

export const signUpMutation = gql`
mutation CreateUser($userInput: UserInput!) {
  user {
    create(organizationId: 3, userInput: $userInput) {
      id
      firstName
      lastName
      email
      organizationId
      balance
    }
  }
}
`