import React, { Component } from 'react'
import Modal from '@material-ui/core/Modal'
import * as PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import OrganizationSettingsActions from '../actions'
import DeliveryPeriodForm from '../forms/DeliveryPeriodForm'
import { createDeliveryPeriodMutation, editDeliveryPeriodMutation } from '../../../graphql/deliveryPeriodQueries'
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

class EditDeliveryPeriodModal extends Component {
  render() {
    const {onSubmit} = this.props

    const {
      classes,
      createDeliveryPeriodMutate,
      editDeliveryPeriodMutate,
      editDeliveryPeriod,
      closeCreateDeliveryPeriodModal,
      createDeliveryPeriodModalOpen,
      currentDeliveryPeriod
    } = this.props

    const submit = values => {
      const deliveryPeriodInput = {
        classPeriod: values.classPeriod,
        maxQueueSize: values.maxQueueSize,
        monday: values.monday,
        tuesday: values.tuesday,
        wednesday: values.wednesday,
        thursday: values.thursday,
        friday: values.friday,
      }
      if (editDeliveryPeriod) {
        editDeliveryPeriodMutate({
          variables: {
            deliveryPeriodInput,
            deliveryPeriodId: currentDeliveryPeriod.id
          }
        }).then(() => {
          closeCreateDeliveryPeriodModal()
          onSubmit()
        })
      } else {
        createDeliveryPeriodMutate({
          variables: {
            deliveryPeriodInput: values,
            organizationId: StorageService.getOrganizationId()
          }
        }).then(() => {
          closeCreateDeliveryPeriodModal()
          onSubmit()
        })
      }
    }

    return (
      <div>
        <Modal open={createDeliveryPeriodModalOpen} onClose={closeCreateDeliveryPeriodModal}>
          <div style={getModalStyle()} className={classes.paper}>
            <DeliveryPeriodForm editProduct={editDeliveryPeriod} onSubmit={submit}/>
          </div>
        </Modal>
      </div>
    )
  }
}

EditDeliveryPeriodModal.propTypes = {
  classes: PropTypes.object.isRequired,
  currentDeliveryPeriod: PropTypes.object,
  createDeliveryPeriodMutate: PropTypes.func.isRequired,
  editDeliveryPeriodMutate: PropTypes.func.isRequired,
  editDeliveryPeriod: PropTypes.bool.isRequired,
  closeCreateDeliveryPeriodModal: PropTypes.func.isRequired,
  createDeliveryPeriodModalOpen: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func
}

EditDeliveryPeriodModal.defaultProps = {
  currentDeliveryPeriod: null,
  onSubmit: () => {
  }
}

const mapStateToProps = ({organizationSettings}) => {
  return {
    createDeliveryPeriodModalOpen: organizationSettings.createDeliveryPeriodModalOpen,
    currentDeliveryPeriod: {...(organizationSettings.editDeliveryPeriodObject && organizationSettings.editDeliveryPeriodObject.deliveryPeriod) || null},
    editDeliveryPeriod: organizationSettings.editDeliveryPeriod
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeCreateDeliveryPeriodModal: () => dispatch(OrganizationSettingsActions.closeCreateDeliveryPeriodModal()),
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  graphql(createDeliveryPeriodMutation, {
    name: 'createDeliveryPeriodMutate'
  }),
  graphql(editDeliveryPeriodMutation, {
    name: 'editDeliveryPeriodMutate'
  })
)(EditDeliveryPeriodModal)
