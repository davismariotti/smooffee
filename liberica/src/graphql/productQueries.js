import gql from 'graphql-tag'

export const readProductsQuery = gql`
query ReadProducts($organizationId: Long!) {
  product {
    list(organizationId: $organizationId) {
      id
      name
      description
      price
      orderModifiers {
        id
        status
        name
        additionalCost
      }
    }
  }
}
`
export const newOrderMutation = gql`
mutation createOrder($userId: String!, $orderInput: OrderInput!) {
  order {
    create(userId: $userId, orderInput: $orderInput) {
      id
    }
  }
}
`
