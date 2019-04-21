import React, { Component } from 'react'
import { Paper, Typography } from '@material-ui/core'
import { Button as ReactStrapButton } from 'reactstrap'
import { compose } from 'redux'
import { graphql } from 'react-apollo'
import * as PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { AlignCenter } from '../../styles/core'
import { organizationReadQuery } from '../../../graphql/organizationQueries'
import OrganizationSettingsActions from '../actions'
import EditOrganizationModal from '../modals/EditOrganizationModal'
import { StorageService } from '../../../services/StorageService'

const mapDispatchToProps = (dispatch) => {
  return {
    openEditOrganizationModal: (organization) => dispatch(OrganizationSettingsActions.openEditOrganizationModal(organization))
  }
}

class OrganizationName extends Component {

  render() {
    const { organizationReadQueryResult, openEditOrganizationModal, editOrganization } = this.props
    return (
      <div>
        <EditOrganizationModal open={!!editOrganization} onSubmit={organizationReadQueryResult.refetch}/>
        <Paper className="paper" elevation={1}>
          <AlignCenter>
            <Typography style={{ margin: '10px' }} variant="h5" component="h3">
              {(organizationReadQueryResult && organizationReadQueryResult.organization && organizationReadQueryResult.organization.read.name) || ''}
              <div style={{ float: 'right', marginRight: '40px' }}>
                <ReactStrapButton color="secondary" outline onClick={() => {
                  openEditOrganizationModal((organizationReadQueryResult && organizationReadQueryResult.organization && organizationReadQueryResult.organization.read) || null)
                }}>
                  Edit
                </ReactStrapButton>
              </div>
            </Typography>
          </AlignCenter>
        </Paper>
      </div>
    )
  }
}


OrganizationName.propTypes = {
  organizationReadQueryResult: PropTypes.object.isRequired,
  openEditOrganizationModal: PropTypes.func.isRequired,
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
  connect(mapStateToProps, mapDispatchToProps)
)(OrganizationName)