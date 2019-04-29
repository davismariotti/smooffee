import gql from 'graphql-tag'

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
export const creatUserMutation = gql`
mutation CreateUser($organizationId:Long!,$userInput:UserInput!) {
  user{
    create(organizationId:$organizationId,userInput:$userInput) {
      id
      firstName
      lastName
    }
  }
}
`

export const readOrdersQuery = gql`
query ReadOrders {
  user {
    currentUser {
      id
      orders {
        id
        status
        recipient
        location
        notes
        product {
          id
          name
          price
          description
        }
      }
    }
  }
}
`