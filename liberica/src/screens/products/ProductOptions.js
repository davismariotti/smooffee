import React from 'react'
import { Button, Picker, StyleSheet, Text, View } from 'react-native'
import { Card, ListItem } from 'react-native-elements'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'

class ProductOptions extends React.Component {
  static navigationOptions = {
    title: 'Options'
  }

  constructor(props) {
    super(props)
    this.renderPicker = this.renderPicker.bind(this)
  }

  renderPicker({ input: { onChange, value } }) {
    const { sizes } = this.props
    return (
      <Picker style={{ height: 50, width: 1000 }}
              selectedValue={value}
              onValueChange={(itemValue) => onChange(itemValue)}>
        <Picker.Item key='1' label='Small' value='Small'/>
        <Picker.Item key='2' label='Medium' value='Medium'/>
        <Picker.Item key='3' label='Large' value='Large'/>
      </Picker>
    )
  }

  renderCard({ product, input: { onChange, value } }) {
    return (
      <Card containerStyle={{ padding: 0 }}>
        {product.orderModifiers.map(orderModifier => {
          return (
            <ListItem
              key={orderModifier.id}
              title={orderModifier.name}
              selected={value === orderModifier.id}
              onPress={() => {
                onChange(orderModifier.id)
              }}/>
          )
        })}
      </Card>
    )
  }


  render() {
    const { navigation } = this.props
    const product = navigation.getParam('product', {})

    return (
      <View style={styles.container}>
        <Text style={styles.drinkText}>{product.name}</Text>
        <Text>Choose Size</Text>
        <Field name="size" component={this.renderPicker}/>
        <Field name="orderModifiers" component={this.renderCard} product={product}/>
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

export default compose(
  reduxForm({
    form: 'orderForm'
  }),
)(ProductOptions)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  drinkText: {
    fontSize: 30,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 34,
    textAlign: 'center'
  },
})