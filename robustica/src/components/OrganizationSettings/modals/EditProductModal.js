import React, { Component } from 'react'
import Modal from '@material-ui/core/Modal'
import * as PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import Loader from 'react-loaders'
import { createProductMutation, editProductMutation } from '../../../graphql/productQueries'
import OrganizationSettingsActions from '../actions'
import EditProductForm from '../forms/EditProductForm'
import { StorageService } from '../../../services/StorageService'
import { listOrderModifiersQuery } from '../../../graphql/orderModifierQueries'
import Status from '../../../utils/Status'
import { CenterDiv } from '../../styles/core'

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
    const { onSubmit, listOrderModifiersQueryResult } = this.props

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
        name: values.name,
        orderModifiers: values.orderModifiers
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
            organizationId: StorageService.getOrganizationId()
          }
        }).then(() => {
          closeCreateProductModal()
          onSubmit()
        })
      }
    }

    if (listOrderModifiersQueryResult.loading) {
      if (createProductModalOpen) {
        return (
          <CenterDiv>
            <Loader type="line-scale" active color="black"/>
          </CenterDiv>
        )
      }
      return null
    }

    return (
      <div>
        <Modal open={createProductModalOpen} onClose={closeCreateProductModal}>
          <div style={getModalStyle()} className={classes.paper}>
            <EditProductForm availableOrderModifiers={listOrderModifiersQueryResult.orderModifier.list} editProduct={editProduct} onSubmit={submit}/>
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
  onSubmit: () => {
  }
}

const mapStateToProps = ({ organizationSettings }) => {
  return {
    createProductModalOpen: organizationSettings.createProductModalOpen,
    currentProduct: { ...(organizationSettings.editProductObject && organizationSettings.editProductObject.product) || null },
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
  }),
  graphql(listOrderModifiersQuery, {
    name: 'listOrderModifiersQueryResult',
    options: {
      variables: {
        organizationId: StorageService.getOrganizationId(),
        parameters: {
          order: [
            'name',
            'asc'
          ],
          filter: {
            eq: {
              field: 'status',
              value: Status.ACTIVE
            }
          }
        }
      }
    }
  })
)(EditProductModal)
