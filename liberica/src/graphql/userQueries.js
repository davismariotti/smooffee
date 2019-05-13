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

export const readUserCardsQuery = gql`
query ReadUserCards {
  user {
    currentUser {
      id
      cards {
        stripeCardId
        last4
        brand
      }
    }
  }
}
`

export const createUserMutation = gql`
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

export const attachCardMutation = gql`
mutation AttachCard($userId: String!, $stripeToken: String!) {
  user {
    attachCard(userId: $userId, stripeToken: $stripeToken) {
      stripeCardId
    }
  }
}
`

export const sendFeedbackMutation = gql`
mutation SendFeedback($message: String!) {
  user {
    feedback(message: $message)
  }
}
`
