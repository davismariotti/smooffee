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
      })
    }

    if (listDeliveryPeriodsQueryResult.loading || listDeliveryPeriodsQueryResult.error) {
      return (
        <LoadScreen/>
      )
    }

    const orderModifierNames = orderForm.orderModifiers && product.orderModifiers.filter(orderModifier => orderForm.orderModifiers.includes(orderModifier.id)).map(orderModifier => orderModifier.name) || []

    console.log('orderModifierNames', orderModifierNames)
    console.log('product.orderModifiers', product.orderModifiers)
    console.log('orderForm.orderModifiers', orderForm.orderModifiers)

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Order Confirmation</Text>
        <Card>
          <Text style={styles.drinkInfo}>{product.name} - {orderForm.size}</Text>
          {orderModifierNames.map(name => <Text>{`+ ${name}`}</Text>)}
        </Card>
        <DeliveryForm firstName={firstName} onSubmit={submit} deliveryPeriods={listDeliveryPeriodsQueryResult.deliveryPeriod.list}/>
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
  drinkInfo: {
    fontSize: 20,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'left'
  },
  title: {
    fontSize: 25,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 30,
    textAlign: 'center',
    marginTop: 10,
  },
})