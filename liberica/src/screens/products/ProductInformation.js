import React from 'react'
import { Button, ScrollView, StyleSheet, Text } from 'react-native'
import { graphql } from 'react-apollo'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { readCurrentUserQuery } from '../../graphql/userQueries'
import { createOrderMutation } from '../../graphql/orderQueries'
import { StorageService } from '../../services/StorageService'

class ProductInformation extends React.Component {
  static navigationOptions = {
    title: 'Information'
  }

  render() {
    const { navigation, readCurrentUserQueryResult, createOrderMutate } = this.props
    const product = navigation.getParam('product', {})
    const balance = (readCurrentUserQueryResult.user && readCurrentUserQueryResult.user.currentUser.balance)
    const firstName = (readCurrentUserQueryResult.user && readCurrentUserQueryResult.user.currentUser.firstName) || ''
    const lastName = (readCurrentUserQueryResult.user && readCurrentUserQueryResult.user.currentUser.lastName) || ''

    const submit = async () => {
      createOrderMutate({
        variables: {
          userId: await StorageService.getUserId(),
          orderInput: {
            location: 'EJ308', // TODO
            notes: 'Optional', // TODO
            productId: product.id,
            recipient: firstName + " " + lastName,
            deliveryPeriodId: 2, // TODO
            orderModifiers: this.props.selectedOrderModifiers
          }
        }
      }).then(() => {
        this.props.navigation.navigate('Home')
      })
    }

    return (
      <ScrollView style={styles.container}>
        <Text>{firstName} {lastName}</Text>
        <Text>{product.name}</Text>
        <Text>{this.props.selectedSize}</Text>
        <Text>{this.props.selectedOrderModifiers}</Text>
        <Button
          title="Submit"
          onPress={submit}
        />
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
  connect(mapStateToProps),
)(ProductInformation)


const styles = StyleSheet.create({
  drinkText: {
    fontSize: 30,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 34,
    textAlign: 'center'
  },
})