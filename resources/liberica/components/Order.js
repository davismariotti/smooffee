import React, { Component } from 'react'
import { Button, Text, View, } from 'react-native'

class Order extends Component {
  handleOptionsButton() {

  }

  render() {
    return (
      <View>
        <Text>{this.props.name}</Text>
        <Text>{this.props.price}</Text>
        <Text>{this.props.description}</Text>
        <Button title='options' onPress={this.handleOptionsButton.bind(this)}/>
      </View>
    )
  }
}

export default Order