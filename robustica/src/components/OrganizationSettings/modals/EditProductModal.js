import React, { Component } from 'react'
import Modal from '@material-ui/core/Modal'
import * as PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { createProductMutation, editProductMutation } from '../../../graphql/productQueries'
import OrganizationSettingsActions from '../actions'
import EditProductForm from '../forms/EditProductForm'
import { ORGANIZATION_ID } from '../../../constants'

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
    const {onSubmit} = this.props

    const {
      classes,
      createProductMutate,
      editProductMutate,
      editProduct,
      closeCreateProductModal,
      createProductModalOpen,
      currentProduct
    } = this.props

    const submit = values => {
      const productInput = {
        price: values.price,
        description: values.description,
        name: values.name
      }
      if (editProduct) {
        editProductMutate({
          variables: {
            productInput,
            productId: currentProduct.id
          }
        }).then(() => {
          closeCreateProductModal()
          onSubmit()
        })
      } else {
        createProductMutate({
          variables: {
            productInput: values,
            organizationId: localStorage.getItem(ORGANIZATION_ID)
          }
        }).then(() => {
          closeCreateProductModal()
          onSubmit()
        })
      }
    }

    return (
      <div>
        <Modal open={createProductModalOpen} onClose={closeCreateProductModal}>
          <div style={getModalStyle()} className={classes.paper}>
            <EditProductForm editProduct={editProduct} onSubmit={submit}/>
          </div>
        </Modal>
      </div>
    )
  }
}

EditProductModal.propTypes = {
  classes: PropTypes.object.isRequired,
  currentProduct: PropTypes.object,
  createProductMutate: PropTypes.func.isRequired,
  editProductMutate: PropTypes.func.isRequired,
  editProduct: PropTypes.bool.isRequired,
  closeCreateProductModal: PropTypes.func.isRequired,
  createProductModalOpen: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func
}

EditProductModal.defaultProps = {
  currentProduct: null,
  onSubmit: () => {}
}

const mapStateToProps = ({organizationSettings}) => {
  return {
    createProductModalOpen: organizationSettings.createProductModalOpen,
    currentProduct: {...organizationSettings.editProductObject && organizationSettings.editProductObject.product || null},
    editProduct: organizationSettings.editProduct
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeCreateProductModal: () => dispatch(OrganizationSettingsActions.closeCreateProductModal()),
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  graphql(createProductMutation, {
    name: 'createProductMutate'
  }),
  graphql(editProductMutation, {
    name: 'editProductMutate'
  })
)(EditProductModal)
