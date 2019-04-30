import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { graphql } from 'react-apollo'

import Order from './Order'
import { readOrdersQuery } from '../../../graphql/userQueries'
import LoadScreen from '../../LoadScreen';

class ScrollingOrders extends Component {
  render() {

    const {readOrdersQueryResult} = this.props

    if (readOrdersQueryResult.loading || readOrdersQueryResult.error) {
      return (
        <LoadScreen/>
      )
    }

    return (
      <ScrollView>
        {readOrdersQueryResult.user.currentUser.orders.map(order => {
          return (
            <Order key={order.id} name={order.product.name} price={order.product.price} description={order.product.description}/>
          )
        })}
      </ScrollView>

    )
  }
}

export default graphql(readOrdersQuery, {
  name: 'readOrdersQueryResult'
})
(ScrollingOrders)