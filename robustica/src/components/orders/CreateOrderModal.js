import React, {Component} from 'react'
import Modal from '@material-ui/core/Modal'
import * as PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {Button, FormControl, Input, InputLabel, Typography} from '@material-ui/core'
import {Mutation, Query} from 'react-apollo'
import {gql} from 'apollo-boost'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import {LOGGED_IN_USER_ID} from '../../constants'

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

const CreateOrderMutation = gql`
  mutation CreateOrder($orderInput: OrderInput!, $userId: String!) {
    order {
      create(orderInput: $orderInput, userId: $userId) {
        id
        location
        notes
        product {
          id
          name
          description
          price
          status
        }
        status
      }
    }
  }
`

const ListProductsQuery = gql`
  query ListProducts($organizationId: Long!) {
    product {
      list(organizationId: $organizationId) {
        id
        price
        description
        name
      }
    }
  }
`

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
    const {classes, open, onSubmit} = this.props
    return (
      <div>
        <Query query={ListProductsQuery} variables={{organizationId: 3}}>
          {({loading, error, data}) => {
            if (loading) return 'Loading'
            if (error) return 'Error'
            return (
              <Modal open={open}>
                <div style={getModalStyle()} className={classes.paper}>
                  <Mutation mutation={CreateOrderMutation}>
                    {(createOrder) => (
                      <form onSubmit={e => {
                        e.preventDefault()
                        const orderInput = {
                          location,
                          notes,
                          productId: product
                        }
                        createOrder({
                          variables: {
                            orderInput,
                            userId: localStorage.getItem(LOGGED_IN_USER_ID)
                          }
                        }).then(() => {
                          this.setState({
                            name: '',
                            product: '',
                            location: '',
                            notes: ''
                          })
                          onSubmit()
                        })
                      }}>
                        <Typography variant="headline">
                          Create Order
                        </Typography>
                        <FormControl required fullWidth>
                          <InputLabel htmlFor="product-simple">Product</InputLabel>
                          <Select value={product} onChange={this.handleProductChange} inputProps={{name: 'product', id: 'product-simple'}}>
                            {
                              data.product.list.map(productItem => {
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
                        <FormControl margin="normal" required fullWidth>
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
            )
          }}
        </Query>
      </div>
    )
  }
}

CreateOrderModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func,
  classes: PropTypes.object.isRequired,
}

CreateOrderModal.defaultProps = {
  onSubmit: () => {}
}

export default withStyles(styles)(CreateOrderModal)
