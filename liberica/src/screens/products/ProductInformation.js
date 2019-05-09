import React from 'react'
import { Button, ScrollView, Text, StyleSheet } from 'react-native'
import { Card, ListItem } from 'react-native-elements'
import { graphql } from 'react-apollo'
import { readProductsQuery, newOrderMutation } from '../../graphql/productQueries'
import { compose } from 'redux';
import { connect } from 'react-redux';
import OrderActions from './actions';
import ProductOptions from './ProductOptions';
import { readCurrentUserQuery } from '../../graphql/userQueries';

 class ProductInformation extends React.Component {
  static navigationOptions = {
    title: 'Information'
  }

  render() {
    const { navigation } = this.props
    const product = navigation.getParam('product', {})
    const balance = (readCurrentUserQueryResult.user && readCurrentUserQueryResult.user.currentUser.balance)
    const id = (readCurrentUserQueryResult.user && readCurrentUserQueryResult.user.currentUser.id)
    const firstName = (readCurrentUserQueryResult.user && readCurrentUserQueryResult.user.currentUser.firstName) || ''
    const lastName = (readCurrentUserQueryResult.user && readCurrentUserQueryResult.user.currentUser.lastName) || ''
    
    return (
      <ScrollView style={styles.container}>
      <Text>{firstName} "  " {lastName}</Text>
        <Text>{product.name}</Text>
        <Text>{this.props.selectedSize}</Text>
        <Text>{this.props.selectedOrderModifiers}</Text>
        <Button
          title="Submit"
          onPress={() => {
            this.props.navigation.navigate('Home')
          }}
        />
      </ScrollView>
    )
  }
}

const mapStateToProps = ({order}) => {
  return {
    selectedSize: order.size,
    selectedOrderModifiers: order.orderModifiers
  }
}


export default compose(
  connect(mapStateToProps),
  graphql(newOrderMutation),
  graphql(readCurrentUserQuery), {
    name: 'readCurrentUserQueryResult',
    options:{
      variables:
      organizationId:3,
      parameters:{

      }
    }
  }
    )
  
(ProductInformation)
  


const styles = StyleSheet.create({
  drinkText: {
    fontSize: 30,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 34,
    textAlign: 'center'
  },
})