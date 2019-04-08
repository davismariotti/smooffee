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
mutation EditOrganization($organizationId: Long!, $input: OrganizationInput!) {
  organization {
    update(organizationId: $organizationId, input: $input) {
      id
    }
  }
}
`