import React, { Component } from 'react'
import Modal from '@material-ui/core/Modal'
import * as PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import OrganizationSettingsActions from '../actions'
import OrderModifierForm from '../forms/OrderModifierForm'
import { createOrderModifierMutation, editOrderModifierMutation } from '../../../graphql/orderModifierQueries'
import { StorageService } from '../../../services/StorageService'

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

function getModalStyle() {
  return {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }
}

class EditOrderModifierModal extends Component {
  render() {
    const { onSubmit } = this.props

    const {
      classes,
      createOrderModifierMutate,
      editOrderModifierMutate,
      editOrderModifier,
      closeCreateOrderModifierModal,
      createOrderModifierModalOpen,
      currentOrderModifier
    } = this.props

    const submit = values => {
      const orderModifierInput = {
        name: values.name,
      }
      if (editOrderModifier) {
        editOrderModifierMutate({
          variables: {
            orderModifierInput,
            orderModifierId: currentOrderModifier.id
          }
        }).then(() => {
          closeCreateOrderModifierModal()
          onSubmit()
        })
      } else {
        createOrderModifierMutate({
          variables: {
            orderModifierInput: values,
            organizationId: StorageService.getOrganizationId()
          }
        }).then(() => {
          closeCreateOrderModifierModal()
          onSubmit()
        })
      }
    }

    return (
      <div>
        <Modal open={createOrderModifierModalOpen} onClose={closeCreateOrderModifierModal}>
          <div style={getModalStyle()} className={classes.paper}>
            <OrderModifierForm editOrderModifier={editOrderModifier} onSubmit={submit}/>
          </div>
        </Modal>
      </div>
    )
  }
}

EditOrderModifierModal.propTypes = {
  classes: PropTypes.object.isRequired,
  currentOrderModifier: PropTypes.object,
  createOrderModifierMutate: PropTypes.func.isRequired,
  editOrderModifierMutate: PropTypes.func.isRequired,
  editOrderModifier: PropTypes.bool.isRequired,
  closeCreateOrderModifierModal: PropTypes.func.isRequired,
  createOrderModifierModalOpen: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func
}

EditOrderModifierModal.defaultProps = {
  currentOrderModifier: null,
  onSubmit: () => {
  }
}

const mapStateToProps = ({ organizationSettings }) => {
  return {
    createOrderModifierModalOpen: organizationSettings.createOrderModifierModalOpen,
    currentOrderModifier: { ...(organizationSettings.editOrderModifierObject && organizationSettings.editOrderModifierObject.orderModifier) || null },
    editOrderModifier: organizationSettings.editOrderModifier
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeCreateOrderModifierModal: () => dispatch(OrganizationSettingsActions.closeCreateOrderModifierModal()),
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  graphql(createOrderModifierMutation, {
    name: 'createOrderModifierMutate'
  }),
  graphql(editOrderModifierMutation, {
    name: 'editOrderModifierMutate'
  })
)(EditOrderModifierModal)
