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

export const readProductModifiers = gql`
query ReadProductModifiers($organizationId:Long!,$name:Long!){
  product{
    list(organizationId:$organizationId){
      list(name:$name){
        orderModifiers{
          id
          status
          name
        }
      }
    }
  }
}
`