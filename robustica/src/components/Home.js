import React, {Component} from 'react'
import {Button, GridList, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import * as PropTypes from 'prop-types'
import {compose, graphql} from 'react-apollo'
import Order from './orders/Order'
import '../css/index.css'
import CreateOrderModal from './orders/CreateOrderModal'
import {ORGANIZATION_ID} from '../constants'
import {listOrdersQuery} from '../graphql/orderQueries'

const styles = {
  title: {
    marginTop: '10px',
    marginBottom: '10px'
  }
}

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false
    }
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
    const {classes, listOrdersQueryResult} = this.props
    const {showModal} = this.state

    if (listOrdersQueryResult.loading) return <div>Loading</div>
    if (listOrdersQueryResult.error) return <div>Error</div>

    return (
      <div className="orderList">
        <div>
          <CreateOrderModal open={showModal} onSubmit={this.handleCreateOrderSubmit}/>
          <Typography className={classes.title} variant="h3" color="inherit">
            Current Orders
          </Typography>
          <Button onClick={this.showModal}>
            Create Order
          </Button>
          <GridList cols={3} padding={10}>
            {listOrdersQueryResult.order.list.map(order => {
              return <Order key={order.id} item={order.product.name} user={order.recipient} location={order.location} notes={order.notes}/>
            })}
          </GridList>
        </div>
      </div>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  listOrdersQueryResult: PropTypes.object
}

Home.defaultProps = {
  listOrdersQueryResult: {}
}

export default compose(
  withStyles(styles),
  graphql(listOrdersQuery, {
    name: 'listOrdersQueryResult',
    options: () => {
      return {
        variables: {
          organizationId: localStorage.getItem(ORGANIZATION_ID),
          statuses: [1]
        }
      }
    }
  })
)(Home)
