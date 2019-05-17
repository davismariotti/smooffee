import React, { Component } from 'react'
import { Button, Text, View, } from 'react-native'
import { formatCurrency } from '../../../utils/currencyUtils'

class Order extends Component {
  handleOptionsButton() {

  }

  render() {

    const { order } = this.props

    return (
      <View>
        <Text>{order.product.name}</Text>
        <Text>{order.recipient}</Text>
        <Text>{formatCurrency(order.totalCost)}</Text>
        <Text>{order.product.description}</Text>
        <Text>{order.status}</Text>
        <Button title='options' onPress={this.handleOptionsButton.bind(this)}/>
      </View>
    )
  }
}

export default Order