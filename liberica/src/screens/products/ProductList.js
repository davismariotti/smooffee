import React from 'react'
import { Button, Picker, ScrollView, StyleSheet, Text, View } from 'react-native'
import { graphql } from 'react-apollo'
import { readProductQuery } from '../../graphql/productQuery'
import { formatCurrency } from '../../utils/currencyUtils'
import LoadScreen from '../LoadScreen';
import Product from './Product'


export class ProductList extends React.Component {
    static navigationOptions = {
      title: 'Products'
    }
    render() {
      const {readProductQueryResult} = this.props
      
    
      return (
        <ScrollView style={styles.container}>
          {readProductQueryResult.product.map(product => {
            return(
              <Product key={product.id} name={product.product.name} price={product.product.price} description={product.product.description}/>
            )
          })}
        </ScrollView>
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