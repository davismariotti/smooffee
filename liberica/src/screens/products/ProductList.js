import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { graphql } from 'react-apollo'
import { readProductQuery } from '../../graphql/productQuery'
import LoadScreen from '../LoadScreen'
import Product from './Product'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
})



class ProductList extends React.Component {
  static navigationOptions = {
    title: 'Products'
  }

  render() {
    const {readProductQueryResult} = this.props

    if (readProductQueryResult.loading || readProductQueryResult.error) {
      return (
        <LoadScreen/>
      )
    }
    return (
      <ScrollView>
        {readProductQueryResult.product.list.map(product => {
          return (
            <Product key={product.id} name={product.name} price={product.price} description={product.description}/>
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