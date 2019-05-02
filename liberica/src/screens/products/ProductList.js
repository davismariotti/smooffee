import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { graphql } from 'react-apollo'
import { readProductQuery } from '../../graphql/productQuery'
import LoadScreen from '../LoadScreen'
import { ListItem, Card } from 'react-native-elements';
import {formatCurrency} from '../../utils/currencyUtils'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
})



class ProductList extends React.Component {
  static navigationOptions = {
    title: 'New Order'
  }

  render() {
    const {readProductQueryResult} = this.props

    if (readProductQueryResult.loading || readProductQueryResult.error) {
      return (
        <LoadScreen/>
      )
    }
    return (
      <Card containerStyle={{padding:0}}>
        {readProductQueryResult.product.list.map(product => {
          return (
            <ListItem 
            key={product.id}
             title={product.name} 
             subtitle={formatCurrency(product.price)}
             onPress={() => {
              this.props.navigation.navigate('ProductOptions',
              {itemId: product.id,
              item: product.name,
              })}}/>
          )
        })}
      </Card>
    )
  }
}

export default graphql(readProductQuery, {
  name: 'readProductQueryResult',
  options: {
    variables: {
      organizationId: 3

    }
  }
})
(ProductList)