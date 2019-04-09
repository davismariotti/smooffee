import React, { Component } from 'react'
import Modal from '@material-ui/core/Modal'
import * as PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Button, Typography, MenuItem } from '@material-ui/core'
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { Field, propTypes, reduxForm } from 'redux-form'
import { Select, TextField } from 'redux-form-material-ui'

import { ORGANIZATION_ID, USER_ID } from '../../../constants'
import { createOrderMutation } from '../../../graphql/orderQueries'
import { listProductsQuery } from '../../../graphql/productQueries'
import HomeActions from '../actions'
import { CenterDiv } from '../../styles/core'
import { StyledFormRow } from '../../styles/forms'

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

class CreateOrderModal extends Component {
  render() {
    const {classes, open, listProductsQueryResult, closeModal, createOrderMutate, handleSubmit, refetch} = this.props

    const submit = values => {
      const orderInput = {
        location: values.location,
        notes: values.notes,
        productId: values.product,
        recipient: values.recipient,
        deliveryPeriodId: 0 // TODO
      }
      createOrderMutate({
        variables: {
          orderInput,
          userId: localStorage.getItem(USER_ID)
        }
      }).then(() => {
        closeModal()
        refetch()
      })
    }

    if (listProductsQueryResult.loading) return (
      <CenterDiv>Loading...</CenterDiv>
    )
    if (listProductsQueryResult.error) return (
      <CenterDiv>Error</CenterDiv>
    )

    return (
      <div>
        <Modal open={open} onClose={closeModal}>
          <CenterDiv className={classes.paper}>
            <Typography variant="headline">Create Order</Typography>
            <form onSubmit={handleSubmit(submit)}>
              <StyledFormRow>
                <Field fullWidth name="product" component={Select} label="Product">
                  {
                    listProductsQueryResult.product.list.map(productItem => {
                      return <MenuItem key={productItem.id} value={productItem.id}>{productItem.name}</MenuItem>
                    })
                  }
                </Field>
              </StyledFormRow>
              <StyledFormRow>
                <Field fullWidth required name="recipient" component={TextField} label="Recipient"/>
              </StyledFormRow>
              <StyledFormRow>
                <Field fullWidth required name="location" component={TextField} label="Location"/>
              </StyledFormRow>
              <StyledFormRow>
                <Field fullWidth name="notes" component={TextField} label="Notes"/>
              </StyledFormRow>
              <Button type="submit" fullWidth variant="contained">Submit</Button>
            </form>
          </CenterDiv>
        </Modal>
      </div>
    )
  }
}

CreateOrderModal.propTypes = {
  ...propTypes,
  open: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  listProductsQueryResult: PropTypes.object,
  createOrderMutate: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  refetch: PropTypes.func
}

CreateOrderModal.defaultProps = {
  listProductsQueryResult: {},
  refetch: () => {}
}

function mapDispatchToProps(dispatch) {
  return {
    closeModal: () => dispatch(HomeActions.closeCreateOrderModal())
  }
}

export default compose(
  connect(null, mapDispatchToProps),
  withStyles(styles),
  graphql(listProductsQuery, {
    name: 'listProductsQueryResult',
    options: () => {
      return {
        variables: {
          organizationId: localStorage.getItem(ORGANIZATION_ID), // TODO use as props?
          parameters: {
            filter: {
              eq: {
                field: 'status',
                value: '1'
              }
            }
          }
        }
      }
    }
  }),
  graphql(createOrderMutation, {
    name: 'createOrderMutate'
  }),
  reduxForm({
    form: 'createOrderForm'
  })
)(CreateOrderModal)
