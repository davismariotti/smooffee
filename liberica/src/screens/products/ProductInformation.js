import React from 'react'
import { Button, ScrollView, StyleSheet, Text } from 'react-native'
import { graphql } from 'react-apollo'
import { Field, reduxForm } from 'redux-form'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Input, Card } from 'react-native-elements'
import { readCurrentUserQuery } from '../../graphql/userQueries'
import {listDeliveryPeriodsQuery} from '../../graphql/deliveryPeriodQueries'
import { createOrderMutation } from '../../graphql/orderQueries'
import LoadScreen from '../LoadScreen'
import Status  from '../../utils/Status'
import { StorageService } from '../../services/StorageService'
import DeliveryForm from './DeliveryForm';

class ProductInformation extends React.Component {
  static navigationOptions = {
    title: 'Information'
  }


  render() {
    const { navigation, readCurrentUserQueryResult, createOrderMutate, listDeliveryPeriodsQueryResult } = this.props
    const product = navigation.getParam('product', {})
    const balance = (readCurrentUserQueryResult.user && readCurrentUserQueryResult.user.currentUser.balance)
    const firstName = (readCurrentUserQueryResult.user && readCurrentUserQueryResult.user.currentUser.firstName) || ''
    const lastName = (readCurrentUserQueryResult.user && readCurrentUserQueryResult.user.currentUser.lastName) || ''

    const submit = async ({name,room,notes}) => {
      createOrderMutate({
        variables: {
          userId: await StorageService.getUserId(),
          orderInput: {
            location: room, // TODO
            notes: notes, // TODO
            productId: product.id,
            recipient: name,
            deliveryPeriodId: 2, // TODO
            orderModifiers: this.props.selectedOrderModifiers
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
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Order Confirmation</Text>
       <Card>
        <Text style={styles.drinkInfo}>{product.name}  ({this.props.selectedSize})</Text>
        <Text style={styles.drinkInfo}>{this.props.selectedOrderModifiers}</Text>
        </Card>
        <DeliveryForm firstName={firstName} onSubmit={submit} deliveryPeriods={listDeliveryPeriodsQueryResult.deliveryPeriod.list}/>
      </ScrollView>
    )
  }
}

const mapStateToProps = ({ order }) => {
  return {
    selectedSize: order.size,
    selectedOrderModifiers: order.orderModifiers
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
  connect(mapStateToProps),
)(ProductInformation)


const styles = StyleSheet.create({
  drinkInfo: {
    fontSize: 20,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'left'
  },
  title: {
    fontSize:25,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 30,
    textAlign: 'center',
    marginTop: 10,
  },


})