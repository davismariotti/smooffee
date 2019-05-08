import React, { Component } from 'react'
import { Paper } from '@material-ui/core'
import { compose } from 'redux'
import { graphql } from 'react-apollo'
import * as PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { initialize } from 'redux-form'

import { AlignCenter, CenterDiv } from '../../styles/core'
import { organizationReadAdminQuery, updateStripeDetailsMutation } from '../../../graphql/organizationQueries'
import OrganizationDetailsForm from '../forms/OrganizationDetailsForm'
import { StorageService } from '../../../services/StorageService'
import Loader from '../../Home'

class OrganizationDetails extends Component {

  render() {
    const { organizationReadAdminQueryResult, updateStripeDetailsMutate, reinitialize } = this.props

    if (organizationReadAdminQueryResult.loading) return (
      <CenterDiv>
        <Loader type="line-scale" active color="black"/>
      </CenterDiv>
    )

    const submit = values => {
      return new Promise(resolve => {
        updateStripeDetailsMutate({
          variables: {
            organizationId: StorageService.getOrganizationId(),
            stripePublishableKey: values.stripe_pk,
            stripeSecretKey: values.stripe_sk
          }
        }).then(() => {
          organizationReadAdminQueryResult.refetch()
          resolve()
          reinitialize()
        })
      })
    }

    return (
      <div>
        <Paper className="paper" elevation={1}>
          <AlignCenter>
            <OrganizationDetailsForm onSubmit={submit} initialValues={{
              stripe_sk: organizationReadAdminQueryResult.organization.read.stripeDetails.stripeSecretKey,
              stripe_pk: organizationReadAdminQueryResult.organization.read.stripeDetails.stripePublishableKey
            }}/>
          </AlignCenter>
        </Paper>
      </div>
    )
  }
}


OrganizationDetails.propTypes = {
  organizationReadAdminQueryResult: PropTypes.object.isRequired,
  editOrganization: PropTypes.object
}

const mapStateToProps = ({ organizationSettings }) => {
  return {
    editOrganization: organizationSettings.editOrganization
  }
}

const mapDispatchToProps = dispatch => {
  return {
    reinitialize: () => dispatch(initialize('organizationDetailsForm'))
  }
}

export default compose(
  graphql(organizationReadAdminQuery, {
    name: 'organizationReadAdminQueryResult',
    options: {
      variables: {
        organizationId: StorageService.getOrganizationId()
      }
    }
  }),
  graphql(updateStripeDetailsMutation, {
    name: 'updateStripeDetailsMutate'
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(OrganizationDetails)