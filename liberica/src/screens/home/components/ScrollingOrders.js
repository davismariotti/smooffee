import React, { Component } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { graphql } from 'react-apollo'

import Order from './Order'
import { readOrdersQuery } from '../../../graphql/userQueries'
import LoadScreen from '../../LoadScreen'
import Status from '../../../utils/Status'

class ScrollingOrders extends Component {
  render() {

    const { orders } = this.props


    return (
      <ScrollView>
        <Text style={styles.title}>Active Orders</Text>
        <View style={styles.active}>
          {orders.filter(order => (order.status === Status.ACTIVE || order.status === Status.IN_PROGRESS)).map(order => {
            return (
              <Order key={order.id} order={order}/>
            )
          })}

        </View>

        <Text style={styles.titleCompleted}>Completed Orders</Text>

        <View style={styles.completed}>
          {orders.filter(order => (order.status === Status.COMPLETED)).map(order => {
            return (
              <Order key={order.id} order={order}/>
            )
          })}

        </View>

      </ScrollView>


    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red'
  },
  titleCompleted: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green'
  },
  completed: {
    alignItems: 'center'
  },
  active: {
    alignItems: 'center'
  }
})

export default ScrollingOrders
