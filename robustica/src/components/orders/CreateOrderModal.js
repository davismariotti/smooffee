import React, {Component} from 'react'
import Modal from '@material-ui/core/Modal'
import * as PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {Button, FormControl, Input, InputLabel, Typography} from '@material-ui/core'
import {Mutation} from 'react-apollo'
import {gql} from 'apollo-boost'
import firebaseApp from '../../services/AuthService'
import history from '../../utils/robusticaHistory'

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
      open: true,
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
    console.log('hi')
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
    const {open, product, name, notes, location} = this.state
    const {classes} = this.props
    return (
      <div>
        <Modal open={open}>
          <div style={getModalStyle()} className={classes.paper}>

            <Mutation mutation={CreateOrderMutation}>
              {(createOrder, {data}) => (
                <form onSubmit={e => {
                  e.preventDefault()
                  const orderInput = {
                    location,
                    notes,
                    productId: 3
                  }

                  createOrder({
                    variables: {
                      orderInput,
                      userId: '76GqSI6ohMaBGAiDRvGOqgb6tp03'
                    }
                  }).then(() => {
                    this.setState({
                      open: false,
                      name: '',
                      product: '',
                      location: '',
                      notes: ''
                    })
                  })
                }}>
                  <Typography variant="headline">
                    Create Order
                  </Typography>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="product">Product Name</InputLabel>
                    <Input
                      type="product"
                      name="product"
                      autoComplete="product"
                      value={product}
                      onChange={this.handleProductChange}
                      autoFocus
                    />
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
      </div>
    )
  }
}

CreateOrderModal.propTypes = {
  open: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CreateOrderModal)
