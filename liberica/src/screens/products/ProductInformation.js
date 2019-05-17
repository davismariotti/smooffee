import React from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'
import { graphql } from 'react-apollo'
import { compose } from 'redux'
import { Card } from 'react-native-elements'
import { readCurrentUserQuery } from '../../graphql/userQueries'
import { listDeliveryPeriodsQuery } from '../../graphql/deliveryPeriodQueries'
import { createOrderMutation } from '../../graphql/orderQueries'
import LoadScreen from '../LoadScreen'
import Status from '../../utils/Status'
import { StorageService } from '../../services/StorageService'
import DeliveryForm from './DeliveryForm'
import { getFormValues } from 'redux-form'
import { connect } from 'react-redux'
import { formatCurrency } from '../../utils/currencyUtils'

class ProductInformation extends React.Component {
  static navigationOptions = {
    title: 'Information'
  }


  render() {
    const { navigation, readCurrentUserQueryResult, createOrderMutate, listDeliveryPeriodsQueryResult, orderForm } = this.props

    const product = navigation.getParam('product', {})
    const balance = (readCurrentUserQueryResult.user && readCurrentUserQueryResult.user.currentUser.balance)
    const firstName = (readCurrentUserQueryResult.user && readCurrentUserQueryResult.user.currentUser.firstName) || ''
    const lastName = (readCurrentUserQueryResult.user && readCurrentUserQueryResult.user.currentUser.lastName) || ''

    const submit = async (values) => {
      const { room, notes, name, deliveryPeriod, size, orderModifiers } = values
      createOrderMutate({
        variables: {
          userId: await StorageService.getUserId(),
          orderInput: {
            location: room,
            notes,
            productId: product.id,
            recipient: name,
            size,
            deliveryPeriodId: deliveryPeriod,
            orderModifiers: orderModifiers
          }
        }
      }).then(() => {
        this.props.navigation.navigate('Home')
      }).catch((error => {
        console.log('error', error)
      }))
    }

    if (listDeliveryPeriodsQueryResult.loading || listDeliveryPeriodsQueryResult.error) {
      return (
        <LoadScreen/>
      )
    }

    const orderModifiers = orderForm.orderModifiers && product.orderModifiers.filter(orderModifier => orderForm.orderModifiers.includes(orderModifier.id)) || []
    const orderModifierNames = orderModifiers && orderModifiers.map(orderModifier => orderModifier.name) || []

    let totalCost = product.price
    for (const orderModifier of orderModifiers) {
      totalCost = totalCost + orderModifier.additionalCost
      console.log('orderModifier', orderModifier)
    }

    console.log(totalCost)
    
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Order Confirmation</Text>
        <Card>
          <Text style={styles.drinkInfo}>{product.name} - {orderForm.size}</Text>
          {orderModifierNames.map(name => <Text key={name}>{`+ ${name}`}</Text>)}
          <Text style={styles.drinkInfo}>Total Price: {formatCurrency(totalCost)}</Text>
        </Card>
        <Text style={{ color: 'red', margin: 10, textAlign: 'center' }}>NOT ENOUGH BALANCE</Text>
        <DeliveryForm firstName={firstName} onSubmit={submit} deliveryPeriods={listDeliveryPeriodsQueryResult.deliveryPeriod.list} hasBalance={false}/>
      </ScrollView>
    )
  }
}

export default compose(
  graphql(readCurrentUserQuery, {
    name: 'readCurrentUserQueryResult'
  }),
  graphql(createOrderMutation, {
    name: 'createOrderMutate'
  }),
  graphql(listDeliveryPeriodsQuery, {
    name: 'listDeliveryPeriodsQueryResult',
    options: {
      variables: {
        organizationId: 3,
        parameters: {
          filter: {
            eq: {
              field: 'status',
              value: Status.ACTIVE
            }
          },
          order: [
            'classPeriod',
            'asc'
          ]
        }
      }
    }
  }),
  connect(state => ({
    orderForm: getFormValues('orderForm')(state),
  }))
)(ProductInformation)


const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  drinkInfo: {
    fontSize: 20,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'left',
    padding: 5
  },
  title: {
    fontSize: 25,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 30,
    textAlign: 'center',
    marginTop: 10,
  },
})