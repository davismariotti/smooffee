import gql from 'graphql-tag'

export const organizationReadQuery = gql`
query ReadOrganization($organizationId: Long!) {
  organization {
    read(id: $organizationId) {
      id
      name
    }
  }
}
`

export const organizationReadAdminQuery = gql`
query ReadOrganizationAdmin($organizationId: Long!) {
  organization {
    read(id: $organizationId) {
      id
      name
      stripeDetails {
        stripePublishableKey
        stripeSecretKey
      }
    }
  }
}
`

export const editOrganizationMutation = gql`
mutation EditOrganization($organizationId: Long!, $organizationInput: OrganizationInput!) {
  organization {
    update(organizationId: $organizationId, organizationInput: $organizationInput) {
      id
      stripeDetails {
        stripePublishableKey
        stripeSecretKey
      }
    }
  }
}
`

export const updateStripeDetailsMutation = gql`
mutation UpdateStripeDetails($organizationId: Long!, $stripePublishableKey: String, $stripeSecretKey: String) {
  organization {
    updateStripeDetails(organizationId: $organizationId, stripePublishableKey: $stripePublishableKey, stripeSecretKey: $stripeSecretKey) {
      id
    }
  }
}
`