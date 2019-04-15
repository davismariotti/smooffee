import gql from 'graphql-tag'

export const listDeliveryPeriodsQuery = gql`
query ListDeliveryPeriod($organizationId: Long!, $parameters: QLFinder) {
  deliveryPeriod {
    list(organizationId: $organizationId, parameters: $parameters) {
      id
      status
      classPeriod
      monday
      tuesday
      wednesday
      thursday
      friday
    }
  }
}
`

export const createDeliveryPeriodMutation = gql`
mutation CreateDeliveryPeriod($organizationId: Long!, $deliveryPeriodInput: DeliveryPeriodInput!) {
  deliveryPeriod {
    create(organizationId: $organizationId, deliveryPeriodInput: $deliveryPeriodInput) {
      id
    }
  }
}
`

export const editDeliveryPeriodMutation = gql`
mutation EditDeliveryPeriod($deliveryPeriodId: Long!, $deliveryPeriodInput: DeliveryPeriodInput!) {
  deliveryPeriod {
    update(deliveryPeriodId: $deliveryPeriodId, deliveryPeriodInput: $deliveryPeriodInput) {
      id
    }
  }
}
`

export const editDeliveryPeriodStatusMutation = gql`
mutation EditDeliveryPeriodStatus($deliveryPeriodId: Long!, $status: Int!) {
  deliveryPeriod {
    updateStatus(deliveryPeriodId: $deliveryPeriodId, status: $status) {
      id
    }
  }
}  
`