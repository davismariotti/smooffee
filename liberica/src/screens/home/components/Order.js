import React, { Component } from 'react'
import { StyleSheet, Text, View, } from 'react-native'
import { Card } from 'react-native-elements'
import { formatCurrency } from '../../../utils/currencyUtils'

class Order extends Component {
  handleOptionsButton() {

  }

  render() {
    const { order } = this.props

    console.log(order)

    return (
      <View style={{ paddingBottom: 10 }}>
        <Card containerStyle={{ padding: 40, width: 300 }}>
          <View style={styles.rowAlign}>
            <Text style={styles.title}>{order.product.name}</Text>
            <Text style={styles.money}>   {formatCurrency(order.totalCost)}</Text>
          </View>
          <Text>{order.product.description}</Text>
          <Text style={styles.timeAndSpace}>Location: {order.location}</Text>
          <Text style={styles.timeAndSpace}>Time: {order.createdAt}</Text>
        </Card>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  timeAndSpace: {
    color: 'grey'
  },
  money: {
    color: 'red'
  },
  rowAlign: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  container: {
    alignItems: 'center'
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  },
})

export default Order