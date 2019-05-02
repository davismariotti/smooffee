import React from 'react'
import { graphql } from 'react-apollo'
import { readProductsQuery } from '../../graphql/productQueries'
import LoadScreen from '../LoadScreen'
import { Card, ListItem } from 'react-native-elements'
import { formatCurrency } from '../../utils/currencyUtils'
import Status from '../../utils/Status'


class ProductList extends React.Component {
  static navigationOptions = {
    title: 'New Order'
  }

  render() {
    const { readProductsQueryResult } = this.props

    if (readProductsQueryResult.loading || readProductsQueryResult.error) {
      return (
        <LoadScreen/>
      )
    }
    return (
      <Card containerStyle={{ padding: 0 }}>
        {readProductsQueryResult.product.list.map(product => {
          return (
            <ListItem
              key={product.id}
              title={product.name}
              subtitle={formatCurrency(product.price)}
              onPress={() => {
                this.props.navigation.navigate('ProductOptions', { product })
              }}/>
          )
        })}
      </Card>
    )
  }
}

export default graphql(readProductsQuery, {
  name: 'readProductsQueryResult',
  options: {
    variables: {
      organizationId: 3,
      parameters: {
        order: [
          'name',
          'asc'
        ],
        filter: {
          eq: {
            field: 'status',
            value: Status.ACTIVE
          }
        }
      }
    }
  }
})
(ProductList)


