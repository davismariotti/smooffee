import gql from 'graphql-tag'

export const listDeliveryPeriodsQuery = gql`
query ListDeliveryPeriod($organizationId: Long!, $parameters: QLFinder) {
  deliveryPeriod {
    list(organizationId: $organizationId, parameters: $parameters) {
      id
      status
      classPeriod
      maxQueueSize
      monday
      tuesday
      wednesday
      thursday
      friday
    }
  }
}
`