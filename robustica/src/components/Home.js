import React, {Component} from 'react'
import {Button, GridList, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import * as PropTypes from 'prop-types'
import {Query, withApollo} from 'react-apollo'
import {gql} from 'apollo-boost'
import Order from './orders/Order'
import '../css/index.css'
import CreateOrderModal from './orders/CreateOrderModal'
import {ORGANIZATION_ID} from '../constants'

const LIST_ORDERS_QUERY = gql`
  query ListOrders($organizationId: Long!, $statuses: [Int]!) {
    order {
      list(organizationId: $organizationId, statuses: $statuses) {
        id
        notes
        location
        product {
          name
        }
        status
        recipient
      }
    }
  }
`

const READ_USER_INFO = gql`
  query ReadCurrentUser {
    user {
      currentUser {
        id
        organizationId
      }
    }
  }
`

const styles = {
  title: {
    marginTop: '10px',
    marginBottom: '10px'
  }
}

class Home extends Component {
  constructor(props) {
    super(props)
    const {client} = this.props
    this.state = {
      showModal: false
    }
    client.query({query: READ_USER_INFO}).then(({error, data}) => {
      if (error) {
        return // TODO
      }
      localStorage.setItem(ORGANIZATION_ID, data.user.currentUser.organizationId)
    })
    this.showModal = this.showModal.bind(this)
    this.handleCreateOrderSubmit = this.handleCreateOrderSubmit.bind(this)
  }

  showModal() {
    this.setState({
      showModal: true
    })
  }

  handleCreateOrderSubmit() {
    this.setState({
      showModal: false
    })
  }

  render() {
    const {classes} = this.props
    const {showModal} = this.state
    return (
      <div className="orderList">
        <Query query={LIST_ORDERS_QUERY} variables={{organizationId: localStorage.getItem(ORGANIZATION_ID), statuses: [1]}}>
          {({loading, error, data}) => {
            if (loading) return 'Loading'
            if (error) return 'Error'
            return (
              <div>
                <CreateOrderModal open={showModal} onSubmit={this.handleCreateOrderSubmit}/>
                <Typography className={classes.title} variant="h3" color="inherit">
                  Current Orders
                </Typography>
                <Button onClick={this.showModal}>
                  Create Order
                </Button>
                <GridList cols={3} padding={10}>
                  {data.order.list.map(order => {
                    return <Order key={order.id} item={order.product.name} user={order.recipient} location={order.location} notes={order.notes}/>
                  })}
                </GridList>
              </div>
            )
          }}
        </Query>
      </div>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired
}

export default withStyles(styles)(withApollo(Home))
