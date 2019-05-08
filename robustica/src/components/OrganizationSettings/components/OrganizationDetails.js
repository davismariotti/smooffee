import React, { Component } from 'react'
import { Paper, Typography } from '@material-ui/core'
import { compose } from 'redux'
import { graphql } from 'react-apollo'
import * as PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { AlignCenter } from '../../styles/core'
import { organizationReadQuery } from '../../../graphql/organizationQueries'
import OrganizationDetailsForm from '../forms/OrganizationDetailsForm'
import { StorageService } from '../../../services/StorageService'

class OrganizationDetails extends Component {

  render() {
    return (
      <div>
        <Paper className="paper" elevation={1}>
          <AlignCenter>
            <br/>
            <OrganizationDetailsForm/>
          </AlignCenter>
        </Paper>
      </div>
    )
  }
}


OrganizationDetails.propTypes = {
  organizationReadQueryResult: PropTypes.object.isRequired,
  editOrganization: PropTypes.object
}

const mapStateToProps = ({ organizationSettings }) => {
  return {
    editOrganization: organizationSettings.editOrganization
  }
}

export default compose(
  graphql(organizationReadQuery, {
    name: 'organizationReadQueryResult',
    options: {
      variables: {
        organizationId: StorageService.getOrganizationId()
      }
    }
  }),
  connect(mapStateToProps)
)(OrganizationDetails)