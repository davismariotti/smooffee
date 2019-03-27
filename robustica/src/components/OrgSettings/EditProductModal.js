import React, {Component} from 'react'
import Modal from '@material-ui/core/Modal'
import * as PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {Button, FormControl, Input, InputLabel, Typography} from '@material-ui/core'
import {compose, graphql, Mutation} from 'react-apollo'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import {ORGANIZATION_ID, USER_ID} from '../../constants'
import {createOrderMutation} from '../../graphql/orderQueries'
import { createProductMutation, listProductsQuery } from '../../graphql/productQueries';

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
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.currentProduct.name,
      description: '',
      price: 0,
      status: 0
    }
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
    this.handlePriceChange = this.handlePriceChange.bind(this)
    this.handleStatusChange = this.handleStatusChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
  }

  handleNameChange(e) {
    this.setState({
      name: e.target.value
    })
  }

  handleDescriptionChange(e) {
    this.setState({
      description: e.target.value
    })
  }

  handlePriceChange(e) {
    this.setState({
      price: e.target.value
    })
  }

  handleStatusChange(e) {
    this.setState({
      status: e.target.value
    })
  }

  render() {
    const {name, description, price, status} = this.state
    const {classes, open, onSubmit, createProductMutate} = this.props

    return (
        <div>
        <Modal open={open} onClose={onSubmit}>
          <div style={getModalStyle()} className={classes.paper}>
            <form onSubmit={e => {
              e.preventDefault()
              const productInput = {
                name,
                description,
                price,
                status
              }
              createProductMutate({
                variables: {
                  productInput,
                  organizationId: localStorage.getItem(ORGANIZATION_ID)

                }
              }).then(() => {
                this.setState({
                  name: '',
                  description: '',
                  price: 0,
                  status: 0
                })
                onSubmit()
              })
            }}>
              <Typography variant="headline">
                Edit Product
              </Typography>
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
                <InputLabel htmlFor="description">Description</InputLabel>
                <Input
                  type="description"
                  name="description"
                  autoComplete="location"
                  value={description}
                  onChange={this.handleDescriptionChange}
                  autoFocus
                />
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="price">Price</InputLabel>
                <Input
                  type="price"
                  name="price"
                  autoComplete="price"
                  value={price}
                  onChange={this.handlePriceChange}
                  autoFocus
                />
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="status">Status</InputLabel>
                <Input
                  type="status"
                  name="status"
                  value={status}
                  autoComplete="status"
                  onChange={this.handleStatusChange}
                  autoFocus
                />
              </FormControl>
              <Button type="submit" fullWidth variant="contained">
                Submit
              </Button>
            </form>
          </div>
        </Modal>
      </div>
    )
  }
}

EditProductModal.propTypes = {
  open: PropTypes.bool.isRequired,
  currentProduct: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    status: PropTypes.number.isRequired
  }).isRequired,
  onSubmit: PropTypes.func,
  classes: PropTypes.object.isRequired,
  createProductMutate: PropTypes.object
}

EditProductModal.defaultProps = {
  onSubmit: () => {},
  createProductMutate: {}
}

export default compose(
  withStyles(styles),
  graphql(createProductMutation, {
    name: 'createProductMutate'
  })
)(EditProductModal)
