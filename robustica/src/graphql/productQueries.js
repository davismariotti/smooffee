import {gql} from 'apollo-boost'

export const listProductsQuery = gql`
query ListProducts($organizationId: Long!) {
  product {
    list(organizationId: $organizationId) {
      id
      price
      description
      name
    }
  }
}
`

export const createProductMutation = gql`
mutation CreateProduct($organizationId: Long!, $productInput: ProductInput!) {
  product {
    create(organizationId: $organizationId, productInput: $productInput) {
      id
      organizationId
      description
      price
      name
    }
  }
}
`