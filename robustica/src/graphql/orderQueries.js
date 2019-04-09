import gql from 'graphql-tag'

export const listOrdersQuery = gql`
query ListOrders($organizationId: Long!, $parameters: QLFinder) {
  order {
    list(organizationId: $organizationId, parameters: $parameters) {
      id
      notes
      location
      product {
        id
        name
      }
      status
      recipient
    }
  }
}
`

export const createOrderMutation = gql`
mutation CreateOrder($orderInput: OrderInput!, $userId: String!) {
  order {
    create(orderInput: $orderInput, userId: $userId) {
      id
      location
      notes
      product {
        id
        name
        description
        price
        status
      }
      status
    }
  }
}
`

export const editOrderStatusMutation = gql`
mutation EditOrderStatus($orderId: Long!, $status: Int!) {
  order {
    updateStatus(orderId: $orderId, status: $status) {
      id
    }
  }
}
`