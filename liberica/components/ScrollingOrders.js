import React, { Component } from 'react'
import { ScrollView, } from 'react-native'
import Order from './Order'


class ScrollingOrders extends Component {
  render() {
    return (
      <ScrollView>
        <Order name="Drip Coffee" price="5.20" description="drip drip drip"/>
        <Order name="Drip Coffee" price="5.20" description="drip drip drip"/>
        <Order name="Drip Coffee" price="5.20" description="drip drip drip"/>
        <Order name="Drip Coffee" price="5.20" description="drip drip drip"/>
        <Order name="Drip Coffee" price="5.20" description="drip drip drip"/>
        <Order name="Drip Coffee" price="5.20" description="drip drip drip"/>
        <Order name="Drip Coffee" price="5.20" description="drip drip drip"/>
        <Order name="Drip Coffee" price="5.20" description="drip drip drip"/>
        <Order name="Drip Coffee" price="5.20" description="drip drip drip"/>
        <Order name="Drip Coffee" price="5.20" description="drip drip drip"/>
      </ScrollView>

    )
  }
}

export default ScrollingOrders