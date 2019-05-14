import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { Card, Input, ListItem, Item, Picker } from 'react-native-elements'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { graphql } from 'react-apollo'
import OrderActions from './actions'
import { listDeliveryPeriodsQuery } from '../../graphql/deliveryPeriodQueries'
import LoadScreen from '../LoadScreen'
import Status from '../../utils/Status'




class ProductOptions extends React.Component {
  static navigationOptions = {
    title: 'Options'
  }
  constructor(props){
    super(props)
    this.renderPicker = this.renderPicker.bind(this)
  }
  
  renderPicker({ input: {onChange,value}}){
    const {sizes} = this.props
    return (
    <Picker style = {{height: 50, width: 1000}} 
      selectedValue={value}
      onValueChange= {(itemValue) =>onChange(itemValue)}>
        <Item key='1' label='Small' value='1'/>
        <Item key='2' label='Medium' value='2'/>
        <Item key='3' label='Large' value='3'/>
   
    </Picker>
    )
  }



  render() {
    const { navigation, selectedOrderModifiers, listDeliveryPeriodsQueryResult } = this.props
    const product = navigation.getParam('product', {})

    if (!listDeliveryPeriodsQueryResult.deliveryPeriod) {
      return (
        <LoadScreen/>
      )
    }

    return (
      <View>
        <Text style={styles.drinkText}>{product.name}</Text>
        <View>
          <Text>Choose Size</Text>
          <Field 
          name="size"
          component={this.renderPicker} 
        />
          
        </View>
        <View>
          <Card containerStyle={{ padding: 0 }}>
            {product.orderModifiers.map(orderModifier => {
              return (
                <ListItem
                  key={orderModifier.id}
                  title={orderModifier.name}
                  selected={selectedOrderModifiers.includes(orderModifier.id)}
                  onPress={() => {
                    this.props.selectOrderModifier(orderModifier.id)
                  }}/>
              )
            })}
          </Card>
        </View>
        <Button
          title="Next"
          onPress={() => {
            this.props.navigation.navigate('ProductInformation', { product })
          }}
        />
      </View>
    )
  }
}

const mapStateToProps = ({ order }) => {
  return {
    selectedSize: order.size,
    selectedOrderModifiers: order.orderModifiers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectSize: (size) => dispatch(OrderActions.selectSize(size)),
    selectOrderModifier: (orderModifier) => dispatch(OrderActions.selectOrderModifier(orderModifier))
  }
}

export default compose(
  reduxForm({
    form:'productOptions'
  }),
  connect(mapStateToProps, mapDispatchToProps),
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
)(ProductOptions)

const styles = StyleSheet.create({
  drinkText: {
    fontSize: 30,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 34,
    textAlign: 'center'
  },
})