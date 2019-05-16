import gql from 'graphql-tag'

export const createOrderMutation = gql`
mutation CreateOrder($userId: String!, $orderInput: OrderInput!) {
  order {
    create(userId: $userId, orderInput: $orderInput) {
      id
    }
  }
}
`
