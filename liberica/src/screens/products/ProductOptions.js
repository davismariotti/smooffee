import React from 'react'
import { Button, Picker, Text, View, StyleSheet } from 'react-native'

import { graphql } from 'react-apollo'
import { readProductModifiers } from '../../graphql/productQuery'
import LoadScreen from '../LoadScreen'
import { ListItem, Card } from 'react-native-elements';
import {formatCurrency} from '../../utils/currencyUtils'

class ProductOptions extends React.Component {
  static navigationOptions = {
    title: 'Options'
  }

  static getProductName() {
    return this.product.name
  }
  render() {
    const {navigation} = this.props
    const itemId = navigation.getParam('itemId', 'NO-ID')
    const drinkSelected = navigation.getParam('item', 'error')
    const {readProductModifiersResult} = this.props

    if (readProductModifiersResult.loading || readProductModifiersResult.error) {
      return (
        <LoadScreen/>
      )
    }
    return (
      <View >
        <Text style={styles.drinkText}>{drinkSelected}</Text>
        <View>
          <Text>Choose Size</Text>
          <Picker style={{height: 50, width: 100}}>
            <Picker.Item label="Small" value="Small"/>
            <Picker.Item label="Medium" value="Medium"/>
            <Picker.Item label="Large" value="Large"/>
          </Picker>
        </View>
        <Card containerStyle={{padding:0}}>
        {readProductModifiersResult.product.list.orderModifiers.map(product => {
          return (
            <ListItem 
            key={product.id}
             title={product.name} 
             subtitle={formatCurrency(product.price)}
             onPress={() => {
              this.props.navigation.navigate('ProductInformation',
              {itemId: product.id,
              item: product.name,
              })}}/>
          )
        })}
        </Card>
        <Button
          title="Next"
          onPress={() => {
            this.props.navigation.navigate('Information')
          }}
        />
      </View>
    )
  }
}

export default graphql(readProductModifiers, {
  name: 'readProductModifiersResult',
  options: {
    variables: {
      organizationId: 3,
      name: ProductOptions.getProductName.bind(this)

    }
  }
})
(ProductOptions)

const styles = StyleSheet.create({
  drinkText: {
    fontSize: 30,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 34,
    textAlign: 'center'
  },
})