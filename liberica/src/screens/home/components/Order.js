import React, {Component} from 'react'
import {Button, StyleSheet, Text, View,} from 'react-native'
import {Card} from "react-native-elements";
import {formatCurrency} from '../../../utils/currencyUtils'
class Order extends Component {
  handleOptionsButton() {

  }

  render() {
    return (
      <View style={{paddingBottom:10 }}>
        <Card containerStyle={{padding: 40, width:300}}>
          <View style={styles.rowAlign}>
            <Text style={styles.title}>{this.props.name}</Text>
            <Text style={styles.money}>   {formatCurrency(this.props.price)}</Text>
          </View>
          <Text>{this.props.description}</Text>
          <View style={styles.rowAlign}>
            <Text style={styles.timeAndSpace}>Location</Text>
            <Text style={styles.timeAndSpace}>Time</Text>
          </View>
        </Card>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  timeAndSpace:{
    color:'grey'
  },
  money:{
    color:'red'
  },
  rowAlign:{
    flexDirection:'row',
    justifyContent:'space-between'
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