import gql from 'graphql-tag'

export const listProductsQuery = gql`
query ListProducts($organizationId: Long!) {
  product {
    list(organizationId: $organizationId) {
      id
      price
      description
      name
      status
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

export const editProductMutation = gql`
mutation EditProduct($productId: Long!, $productInput: ProductInput!) {
  product {
    update(productId: $productId, productInput: $productInput) {
      id
      organizationId
      description
      price
      name
    }
  }
}
`

export const editProductStatusMutation = gql`
mutation EditProductStatus($productId: Long!, $status: Int!) {
  product {
    updateStatus(productId: $productId, status: $status) {
      id
    }
  }
}  
`
