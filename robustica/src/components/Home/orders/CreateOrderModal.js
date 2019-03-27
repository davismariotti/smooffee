import React, {Component} from 'react'
import Modal from '@material-ui/core/Modal'
import * as PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {Button, FormControl, Input, InputLabel, Typography} from '@material-ui/core'
import {compose, graphql, Mutation} from 'react-apollo'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import {connect} from 'react-redux'
import {ORGANIZATION_ID, USER_ID} from '../../../constants'
import {createOrderMutation} from '../../../graphql/orderQueries'
import {listProductsQuery} from '../../../graphql/productQueries'
import {closeHomeCreateOrderModal} from '../../../actions/homeActions'

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

class CreateOrderModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      product: '',
      name: '',
      location: '',
      notes: ''
    }
    this.handleProductChange = this.handleProductChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleLocationChange = this.handleLocationChange.bind(this)
    this.handleNotesChange = this.handleNotesChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
  }

  handleProductChange(e) {
    this.setState({
      product: e.target.value
    })
  }

  handleNameChange(e) {
    this.setState({
      name: e.target.value
    })
  }

  handleLocationChange(e) {
    this.setState({
      location: e.target.value
    })
  }

  handleNotesChange(e) {
    this.setState({
      notes: e.target.value
    })
  }

  render() {
    const {product, name, notes, location} = this.state
    const {classes, open, listProductsQueryResult, closeModal} = this.props

    if (listProductsQueryResult.loading) return <div>Loading</div>
    if (listProductsQueryResult.error) return <div>Error</div>

    return (
        <div>
        <Modal open={open} onClose={closeModal}>
          <div style={getModalStyle()} className={classes.paper}>
            <Mutation mutation={createOrderMutation}>
              {(createOrder) => (
                <form onSubmit={e => {
                  e.preventDefault()
                  const orderInput = {
                    location,
                    notes,
                    productId: product,
                    recipient: name,
                    deliveryPeriodId: 0 // TODO
                  }
                  createOrder({
                    variables: {
                      orderInput,
                      userId: localStorage.getItem(USER_ID)
                    }
                  }).then(() => {
                    this.setState({
                      name: '',
                      product: '',
                      location: '',
                      notes: ''
                    })
                    closeModal()
                  })
                }}>
                  <Typography variant="headline">
                    Create Order
                  </Typography>
                  <FormControl required fullWidth>
                    <InputLabel htmlFor="product-simple">Product</InputLabel>
                    <Select value={product} onChange={this.handleProductChange} inputProps={{name: 'product', id: 'product-simple'}}>
                      {
                        listProductsQueryResult.product.list.map(productItem => {
                          return <MenuItem key={productItem.id} value={productItem.id}>{productItem.name}</MenuItem>
                        })
                      }
                    </Select>
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <Input
                      type="name"
                      name="name"
                      autoComplete="name"
                      value={name}
                      onChange={this.handleNameChange}
                      autoFocus
                    />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="name">Location</InputLabel>
                    <Input
                      type="location"
                      name="location"
                      autoComplete="location"
                      value={location}
                      onChange={this.handleLocationChange}
                      autoFocus
                    />
                  </FormControl>
                  <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="name">Notes</InputLabel>
                    <Input
                      type="notes"
                      name="notes"
                      autoComplete="notes"
                      value={notes}
                      onChange={this.handleNotesChange}
                      autoFocus
                    />
                  </FormControl>
                  <Button type="submit" fullWidth variant="contained">
                    Submit
                  </Button>
                </form>
              )}
            </Mutation>
          </div>
        </Modal>
      </div>
    )
  }
}

CreateOrderModal.propTypes = {
  open: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  listProductsQueryResult: PropTypes.object,
  closeModal: PropTypes.func.isRequired
}

CreateOrderModal.defaultProps = {
  listProductsQueryResult: {}
}

function mapDispatchToProps(dispatch) {
  return {
    closeModal: () => dispatch(closeHomeCreateOrderModal())
  };
}

export default compose(
  connect(null, mapDispatchToProps),
  withStyles(styles),
  graphql(listProductsQuery, {
    name: 'listProductsQueryResult',
    options: () => {
      return {
        variables: {
          organizationId: localStorage.getItem(ORGANIZATION_ID) // TODO use as props?
        }
      }
    }
  })
)(CreateOrderModal)
