import React, { Component } from 'react'
import {FlatList, View, StyleSheet, ScrollView, Text} from 'react-native'
import { graphql } from 'react-apollo'

import Order from './Order'
import { readOrdersQuery } from '../../../graphql/userQueries'
import LoadScreen from '../../LoadScreen'
import Status from "../../../utils/Status";
import {Card, ListItem} from "react-native-elements";

class ScrollingOrders extends Component {
  render() {

    const { readOrdersQueryResult } = this.props

    if (readOrdersQueryResult.loading || readOrdersQueryResult.error) {
      return (
        <LoadScreen/>
      )
    }
    const orders = readOrdersQueryResult.user.currentUser.orders
    const activeOrders = orders.filter(order => (order.status === Status.ACTIVE))
    return (
      <ScrollView>
        <Text style={styles.title}>Active Orders</Text>
          <View style={styles.active}>
            {readOrdersQueryResult.user.currentUser.orders.filter(order => (order.status === Status.ACTIVE || order.status === Status.IN_PROGRESS)).map(order => {
              return (
                  <Order
                      key={order.id}
                      name={order.product.name}
                      price={order.product.price}
                      description={order.product.description}
                  />
              )
            })}

          </View>

        <Text style={styles.titleCompleted}>Completed Orders</Text>

            <View style={styles.completed}>
              {readOrdersQueryResult.user.currentUser.orders.filter(order => (order.status === Status.COMPLETED)).map(order => {
                return (
                  <Order
                    key={order.id}
                    name={order.product.name}
                    price={order.product.price}
                    description={order.product.description}
                />
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
    textAlign:'center',
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
});

export default graphql(readOrdersQuery, {
  name: 'readOrdersQueryResult',
  options: {
    variables: {
      organizationId: 3,
      parameters: {
        order: [
          'name',
          'asc'
        ],
        filter: {
          eq: {
            field: 'status',
            value: Status.ACTIVE
          }
        }
      }
    }
  }
})
(ScrollingOrders)