import gql from 'graphql-tag'

export const readProductQuery = gql`
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
      }
    }
  }
}
`
