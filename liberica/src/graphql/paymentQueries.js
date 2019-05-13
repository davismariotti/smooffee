import gql from 'graphql-tag'

// create(userId: String!, paymentInput: PaymentInput!): PaymentEntry!
// input PaymentInput {
//     type: String
//     amount: Int
//     stripeCardId: String
//     stripeToken: String
// }

export const createPaymentMutation = gql`
mutation CreatePayment($userId: String!, $paymentInput: PaymentInput!) {
  payment {
    create(userId: $userId, paymentInput: $paymentInput) {
      id
    }
  }
}
`
