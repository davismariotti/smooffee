import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import * as PropTypes from 'prop-types'
import { compose } from 'redux'
import { Modal } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import { AlignCenter, CenterDiv } from '../../styles/core'
import { editOrganizationMutation } from '../../../graphql/organizationQueries'
import OrganizationSettingsActions from '../actions'
import EditOrganizationForm from '../forms/EditOrganizationForm'

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
})

class EditOrganizationModal extends Component {

  render() {
    const {open, classes, editOrganizationMutate, organizationId, closeEditOrganizationModal, onSubmit} = this.props
    const submit = ({name}) => {
      editOrganizationMutate({
        variables: {
          organizationId,
          organizationInput: {
            name
          }
        }
      }).then(() => {
        closeEditOrganizationModal()
        onSubmit()
      })
    }

    return (
      <div>
        <Modal open={open} onClose={closeEditOrganizationModal}>
          <CenterDiv className={classes.paper}>
            <AlignCenter>
              <EditOrganizationForm onSubmit={submit}/>
            </AlignCenter>
          </CenterDiv>
        </Modal>
      </div>
    )
  }
}

EditOrganizationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  organizationId: PropTypes.number,
  classes: PropTypes.object.isRequired,
  editOrganizationMutate: PropTypes.func.isRequired,
  closeEditOrganizationModal: PropTypes.func.isRequired,
  onSubmit: PropTypes.func
}

EditOrganizationModal.defaultProps = {
  onSubmit: () => {
  }
}

const mapStateToProps = ({organizationSettings}) => {
  return {
    organizationId: (organizationSettings.editOrganization && organizationSettings.editOrganization.organizationId) || null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeEditOrganizationModal: () => dispatch(OrganizationSettingsActions.closeEditOrganizationModal())
  }
}


export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  graphql(editOrganizationMutation, {
    name: 'editOrganizationMutate'
  })
)(EditOrganizationModal)
