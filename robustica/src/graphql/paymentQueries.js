import gql from 'graphql-tag'

export const refundPaymentMutation = gql`
mutation RefundPayment($paymentId: Long!) {
  payment {
    refundPayment(paymentId: $paymentId) {
      id
      status
    }
  }
}
`
