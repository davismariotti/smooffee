import React, { Component } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

import Order from './Order'

class ScrollingOrders extends Component {
  render() {

    const { orders } = this.props

    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator>
          {orders.map(order => {
            return (
              <Order key={order.id} order={order}/>
            )
          })}
        </ScrollView>
      </View>
    )
  }
}

export default ScrollingOrders

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#D3D3D3'
  },
})
