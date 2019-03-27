import React, {Component} from 'react'
import Modal from '@material-ui/core/Modal'
import * as PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {compose, graphql} from 'react-apollo'
import {connect} from 'react-redux'
import { createProductMutation} from '../../graphql/productQueries';
import OrganizationSettingsActions from './actions'
import EditProductForm from './EditProductForm'
import {ORGANIZATION_ID} from '../../constants'

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

class EditProductModal extends Component {
  render() {
    const {
      classes,
      onSubmit,
      createProductMutate,
      editProduct,
      closeCreateProductModal,
      createProductModalOpen
    } = this.props

    const submit = values => {
      createProductMutate({
        variables: {
          productInput: values,
          organizationId: localStorage.getItem(ORGANIZATION_ID)
        }
      }).then(() => {
        closeCreateProductModal()
      })
    }

    return (
        <div>
        <Modal open={createProductModalOpen} onClose={onSubmit}>
          <div style={getModalStyle()} className={classes.paper}>
            <EditProductForm editProduct={editProduct} onSubmit={submit}/>
          </div>
        </Modal>
      </div>
    )
  }
}

EditProductModal.propTypes = {
  onSubmit: PropTypes.func,
  classes: PropTypes.object.isRequired,
  createProductMutate: PropTypes.func,
  editProduct: PropTypes.bool.isRequired,
  closeCreateProductModal: PropTypes.func.isRequired,
  createProductModalOpen: PropTypes.bool.isRequired
}

EditProductModal.defaultProps = {
  onSubmit: () => {},
  createProductMutate: () => {}
}

const mapStateToProps = ({organizationSettings}) => {
  return {
    createProductModalOpen: organizationSettings.createProductModalOpen,
    currentProduct: organizationSettings.editProductObject,
    editProduct: organizationSettings.editProduct
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeCreateProductModal: () => dispatch(OrganizationSettingsActions.closeCreateProductModal())
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  graphql(createProductMutation, {
    name: 'createProductMutate'
  }),
  graphql(createProductMutation, { // TODO
    name: 'editProductMutate'
  })
)(EditProductModal)