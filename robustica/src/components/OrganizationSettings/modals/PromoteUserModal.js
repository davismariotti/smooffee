import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import * as PropTypes from 'prop-types'
import { compose } from 'redux'
import { Chip, MenuItem, Modal, Select, InputLabel } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import { AlignCenter, CenterDiv } from '../../styles/core'
import OrganizationSettingsActions from '../actions'
import { updateRoleMutation } from '../../../graphql/userQueries'
import PromoteUserForm from '../forms/PromoteUserForm'
import FormControl from '../forms/EditProductForm'

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


class PromoteUserModal extends Component {

  render() {
    const { classes, updateRoleMutate, promoteUser, onSubmit, closePromoteUserModal } = this.props

    const submit = ({ role }) => {
      updateRoleMutate({
        variables: {
          userId: promoteUser.id,
          role
        }
      }).then(() => {
        closePromoteUserModal()
        onSubmit()
      })
    }

    const name = promoteUser != null ? `${promoteUser.firstName} ${promoteUser.lastName}` : ''

    return (
      <div>
        <Modal open={!!promoteUser} onClose={closePromoteUserModal}>
          <CenterDiv className={classes.paper}>
            <AlignCenter>
              <PromoteUserForm onSubmit={submit} name={name} initialValues={{role: (promoteUser && promoteUser.role) || null}}/>
            </AlignCenter>
          </CenterDiv>
        </Modal>
      </div>
    )
  }
}

PromoteUserModal.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
  promoteUser: PropTypes.object,
  closePromoteUserModal: PropTypes.func.isRequired,
  updateRoleMutate: PropTypes.func.isRequired
}

PromoteUserModal.defaultProps = {
  onSubmit: () => {
  },
  addMoreFunds: null
}

const mapStateToProps = ({ organizationSettings }) => {
  return {
    promoteUser: organizationSettings.promoteUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closePromoteUserModal: () => dispatch(OrganizationSettingsActions.closePromoteUserModal())
  }
}


export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  graphql(updateRoleMutation, {
    name: 'updateRoleMutate'
  })
)(PromoteUserModal)
