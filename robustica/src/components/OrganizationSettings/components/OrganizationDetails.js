import React, { Component } from 'react'
import { Paper, Typography } from '@material-ui/core'
import { compose } from 'redux'
import { graphql } from 'react-apollo'
import * as PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

import { AlignCenter } from '../../styles/core'
import { organizationReadQuery } from '../../../graphql/organizationQueries'
import { ORGANIZATION_ID } from '../../../constants'
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
            <br/>
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
  connect(mapStateToProps)
)
(OrganizationDetails)