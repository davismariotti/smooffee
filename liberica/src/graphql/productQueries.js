import gql from 'graphql-tag'
import {ApolloProvider, Mutation, qraphql} from 'react-apollo'

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
      }
    }
  }
}
`
export const newOrderMutation = gql`
mutation submitNewOrder($organizationId:Long!,
  $userId:Long!,
  $productId:Long!,
  $sizeId:Long!,
  $orderModifiers: orderModifiers!){
    newOrder(userId:$userId,productId:$productId,sizeId:$sizeId,orderModifiers:$orderModifiers){
      id
    }
  
}`