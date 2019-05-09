import React from 'react'
import { Button, ScrollView, Text, StyleSheet } from 'react-native'
import { Card, ListItem } from 'react-native-elements'
import { compose } from 'redux';
import { connect } from 'react-redux';
import OrderActions from './actions';
import ProductOptions from './ProductOptions';

 class ProductInformation extends React.Component {
  static navigationOptions = {
    title: 'Information'
  }

  render() {
    const { navigation } = this.props
    const product = navigation.getParam('product', {})
    return (
      <ScrollView style={styles.container}>
        <Text>{product.name}</Text>
        <Text>{this.props.selectedSize}</Text>
        <Text>{this.props.selectedOrderModifiers}</Text>
        <Button
          title="Submit"
          onPress={() => {
            this.props.navigation.navigate('Products')
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
  connect(mapStateToProps)
)(ProductInformation)
  

const styles = StyleSheet.create({
  drinkText: {
    fontSize: 30,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 34,
    textAlign: 'center'
  },
})