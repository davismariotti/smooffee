import React, {Component} from 'react'
import {GridList, Typography} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import * as PropTypes from 'prop-types'
import Order from './orders/Order'
import '../css/index.css'

const names = ['Davis', 'Tom', 'Tersa']
const items = ['Strawberry Smoothie', 'Latte', 'Frappuccino']
const locations = ['EJ308', 'RB209']

const orders = Array.from(Array(40).keys())
  .map(() => {
    return {
      item: items[Math.floor(Math.random()*items.length)],
      location: locations[Math.floor(Math.random()*locations.length)],
      user: names[Math.floor(Math.random()*names.length)],
      notes: ''
    }
  })

const styles = {
  title: {
    marginTop: '10px',
    marginBottom: '10px'
  }
}

class Home extends Component {
  render() {
    const {classes} = this.props
    return (
      <div className="orderList">
        <Typography className={classes.title} variant="h3" color="inherit">
          Current Orders
        </Typography>
        <GridList cols={3} padding={10}>
          {orders.map(item => {
            return <Order item={item.item} user={item.user} location={item.location} notes={item.notes}/>
          })}
        </GridList>
      </div>
    )
  }
}


Home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Home)
