import gql from 'graphql-tag'

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
      role
      firstName
      lastName
      status
      balance
      email
    }
  }
}
`

export const listUsersQuery = gql`
query ListUsers($organizationId: Long!, $parameters: QLFinder) {
  user {
    list(organizationId: $organizationId, parameters: $parameters) {
      id
      firstName
      lastName
      status
      role
      balance
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
      role
      status
    }
  }
}
`

export const addCashFundsMutation = gql`
mutation AddsFunds($userId: String!, $paymentInput: PaymentInput!) {
  payment {
    create(userId: $userId, paymentInput: $paymentInput) {
      id
    }
  }
}
 
`
