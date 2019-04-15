import React, { Component } from 'react'
import { Typography, Paper } from '@material-ui/core'
import { Button as ReactStrapButton } from 'reactstrap'
import { compose } from 'redux'
import { graphql } from 'react-apollo'
import * as PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

import { AlignCenter } from '../../styles/core'
import { organizationReadQuery } from '../../../graphql/organizationQueries'
import { ORGANIZATION_ID } from '../../../constants'
import OrganizationSettingsActions from '../actions'
import EditOrganizationModal from '../modals/EditOrganizationModal'
import OrganizationDetailsForm from '../forms/OrganizationDetailsForm'

const styles = {
  organizationSettings: {
    textAlign: 'center'
  },
  paper: {
    margin: '30px',
    padding: '10px'
  },
  tableRowDisabled: {
    color: '#B0B0B0'
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // openEditOrganizationModal: (organization) => dispatch(OrganizationSettingsActions.openEditOrganizationModal(organization))
  }
}

class OrganizationDetails extends Component {

  render() {
    const {classes} = this.props
    return (
      <div>
        <Paper className={classes.paper} elevation={1}>
          <AlignCenter>
            <Typography style={{margin: '10px'}} variant="h5" component="h3">
              Details
            </Typography>
            <br />
            <OrganizationDetailsForm/>
          </AlignCenter>
        </Paper>
      </div>
    )
  }
}


OrganizationDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  organizationReadQueryResult: PropTypes.object.isRequired,
  openEditOrganizationModal: PropTypes.func.isRequired,
  editOrganization: PropTypes.object
}

const mapStateToProps = ({organizationSettings}) => {
  return {
    editOrganization: organizationSettings.editOrganization
  }
}

export default compose(
  withStyles(styles),
  graphql(organizationReadQuery, {
    name: 'organizationReadQueryResult',
    options: {
      variables: {
        organizationId: localStorage.getItem(ORGANIZATION_ID)
      }
    }
  }),
  connect(mapStateToProps, mapDispatchToProps)
)
(OrganizationDetails)