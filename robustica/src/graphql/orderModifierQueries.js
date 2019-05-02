import gql from 'graphql-tag'

export const listOrderModifiersQuery = gql`
query ListOrderModifier($organizationId: Long!, $parameters: QLFinder) {
  orderModifier {
    list(organizationId: $organizationId, parameters: $parameters) {
      id
      status
      name
    }
  }
}
`

export const createOrderModifierMutation = gql`
mutation CreateOrderModifier($organizationId: Long!, $orderModifierInput: OrderModifierInput!) {
  orderModifier {
    create(organizationId: $organizationId, orderModifierInput: $orderModifierInput) {
      id
    }
  }
}
`

export const editOrderModifierMutation = gql`
mutation EditOrderModifier($orderModifierId: Long!, $orderModifierInput: OrderModifierInput!) {
  orderModifier {
    update(orderModifierId: $orderModifierId, orderModifierInput: $orderModifierInput) {
      id
    }
  }
}
`

export const editOrderModifierStatusMutation = gql`
mutation EditOrderModifierStatus($orderModifierId: Long!, $status: String!) {
  orderModifier {
    updateStatus(orderModifierId: $orderModifierId, status: $status) {
      id
    }
  }
}  
`
