import React, { Component } from 'react'
import { Button, Text, View, } from 'react-native'

class Product extends Component {
  handleOptionsButton() {

  }

  render() {
    return (
      <View>
        <Text>{this.props.name}</Text>
        <Text>{this.props.price}</Text>
        <Text>{this.props.description}</Text>
      </View>
    )
  }
}

export default Product