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

export const editOrganizationMutation = gql`
mutation EditOrganization($organizationId: Long!, $organizationInput: OrganizationInput!) {
  organization {
    update(organizationId: $organizationId, organizationInput: $organizationInput) {
      id
    }
  }
}
`