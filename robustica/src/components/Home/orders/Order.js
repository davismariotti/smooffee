import React, { Component } from 'react'
import { Card, CardContent, GridListTile, Typography } from '@material-ui/core'
import '../../../css/index.css'
import * as PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import CardActions from '@material-ui/core/CardActions'
import { compose } from 'redux'
import { graphql } from 'react-apollo'
import { editOrderStatusMutation } from '../../../graphql/orderQueries'
import Status from '../../../utils/Status'

const styles = {
  card: {
    minWidth: 200,
    minHeight: 200,
    margin: '10px'
  },
  media: {
    height: 140,
  },
  gridTile: {
    padding: '3px',
  }
}

class Order extends Component {
  render() {
    const { order, classes, updateOrderStatusMutate, refetch } = this.props

    return (
      <GridListTile className={classes.gridTile}>
        <Card className={classes.card}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h3">{order.product.name}</Typography>
            <Typography component="p">{order.createdAt}</Typography>
            <Typography component="p">{order.recipient}</Typography>
            <Typography component="p">{order.location}</Typography>
            <Typography component="p">{order.notes}</Typography>
          </CardContent>
          <CardActions>
            {order.status === Status.ACTIVE ?
              <Button variant="contained" size="small" color="primary" onClick={() => {
                updateOrderStatusMutate({
                  variables: {
                    orderId: order.id,
                    status: 'In Progress'
                  }
                }).then(() => {
                  refetch()
                })
              }}>
                Start Order
              </Button> :
              <Button variant="contained" size="small" color="secondary" onClick={() => {
                updateOrderStatusMutate({
                  variables: {
                    orderId: order.id,
                    status: 'Completed'
                  }
                }).then(() => {
                  refetch()
                })
              }}>
                Complete Order
              </Button>}
            <Button size="small" color="primary">
              Edit
            </Button>
          </CardActions>
        </Card>
      </GridListTile>
    )
  }
}

Order.propTypes = {
  order: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  updateOrderStatusMutate: PropTypes.func.isRequired,
  refetch: PropTypes.func
}

Order.defaultProps = {
  refetch: () => {
  }
}

export default compose(
  graphql(editOrderStatusMutation, {
    name: 'updateOrderStatusMutate'
  }),
  withStyles(styles)
)(Order)
