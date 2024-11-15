import React, { Component } from 'react'
import Modal from '@material-ui/core/Modal'
import * as PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Button, MenuItem, Typography } from '@material-ui/core'
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { Field, propTypes, reduxForm } from 'redux-form'
import { Select, TextField } from 'redux-form-material-ui'

import { createOrderMutation } from '../../../graphql/orderQueries'
import { listProductsQuery } from '../../../graphql/productQueries'
import HomeActions from '../actions'
import { CenterDiv } from '../../styles/core'
import { StyledFormRow } from '../../styles/forms'
import { listDeliveryPeriodsQuery } from '../../../graphql/deliveryPeriodQueries'
import { validateIsRequired } from '../../../utils/formUtils'
import { StorageService } from '../../../services/StorageService'
import Status from '../../../utils/Status'

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
    const {
      classes,
      open,
      listProductsQueryResult,
      listDeliveryPeriodsQueryResult,
      closeModal,
      createOrderMutate,
      handleSubmit,
      refetch,
      invalid,
      pristine
    } = this.props

    const submit = values => {
      const orderInput = {
        location: values.location,
        notes: values.notes,
        productId: values.product,
        recipient: values.recipient,
        deliveryPeriodId: values.deliveryPeriod
      }
      createOrderMutate({
        variables: {
          orderInput,
          userId: StorageService.getUserId()
        }
      }).then(() => {
        closeModal()
        refetch()
      })
    }

    if (listProductsQueryResult.loading || listDeliveryPeriodsQueryResult.loading) return (
      <CenterDiv>Loading...</CenterDiv>
    )
    if (listProductsQueryResult.error || listDeliveryPeriodsQueryResult.error) return (
      <CenterDiv>Error</CenterDiv>
    )

    return (
      <div>
        <Modal open={open} onClose={closeModal}>
          <CenterDiv className={classes.paper}>
            <Typography variant="headline">Create Order</Typography>
            <form onSubmit={handleSubmit(submit)}>
              <StyledFormRow>
                <Field fullWidth name="product" component={Select} validate={validateIsRequired} label="Product">
                  {
                    listProductsQueryResult.product.list.map(productItem => {
                      return <MenuItem key={productItem.id} value={productItem.id}>{productItem.name}</MenuItem>
                    })
                  }
                </Field>
              </StyledFormRow>
              <StyledFormRow>
                <Field fullWidth name="deliveryPeriod" component={Select} validate={validateIsRequired} label="Delivery Period">
                  {
                    listDeliveryPeriodsQueryResult.deliveryPeriod.list.map(deliveryPeriodItem => {
                      return <MenuItem key={deliveryPeriodItem.id} value={deliveryPeriodItem.id}>{`${deliveryPeriodItem.classPeriod} - ${deliveryPeriodItem.monday}`}</MenuItem>
                    })
                  }
                </Field>
              </StyledFormRow>
              <StyledFormRow>
                <Field fullWidth name="recipient" component={TextField} validate={validateIsRequired} label="Recipient"/>
              </StyledFormRow>
              <StyledFormRow>
                <Field fullWidth name="location" component={TextField} validate={validateIsRequired} label="Location"/>
              </StyledFormRow>
              <StyledFormRow>
                <Field fullWidth name="notes" component={TextField} label="Notes"/>
              </StyledFormRow>
              <Button disabled={invalid || pristine} type="submit" fullWidth variant="contained">Submit</Button>
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
  listProductsQueryResult: PropTypes.object.isRequired,
  listDeliveryPeriodsQueryResult: PropTypes.object.isRequired,
  createOrderMutate: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  refetch: PropTypes.func
}

CreateOrderModal.defaultProps = {
  refetch: () => {
  }
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
    options: {
      variables: {
        organizationId: StorageService.getOrganizationId(), // TODO use as props?
        parameters: {
          filter: {
            eq: {
              field: 'status',
              value: Status.ACTIVE
            }
          }
        }
      }
    }
  }),
  graphql(listDeliveryPeriodsQuery, {
    name: 'listDeliveryPeriodsQueryResult',
    options: {
      variables: {
        organizationId: StorageService.getOrganizationId(),
        parameters: {
          order: [
            'classPeriod',
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
  }),
  graphql(createOrderMutation, {
    name: 'createOrderMutate'
  }),
  reduxForm({
    form: 'createOrderForm'
  })
)(CreateOrderModal)
