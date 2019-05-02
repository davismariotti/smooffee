import React from 'react'
import { Button, Picker, StyleSheet, Text, View } from 'react-native'
import { Card, ListItem } from 'react-native-elements'

class ProductOptions extends React.Component {
  static navigationOptions = {
    title: 'Options'
  }

  static getProductName() {
    return this.product.name
  }

  render() {
    const { navigation } = this.props
    const product = navigation.getParam('product', {})

    return (
      <View>
        <Text style={styles.drinkText}>{product.name}</Text>
        <View>
          <Text>Choose Size</Text>
          <Picker style={{ height: 50, width: 100 }}>
            <Picker.Item label="Small" value="Small"/>
            <Picker.Item label="Medium" value="Medium"/>
            <Picker.Item label="Large" value="Large"/>
          </Picker>
        </View>
        <View>
          <Card containerStyle={{ padding: 0 }}>
            {product.orderModifiers.map(orderModifier => {
              return (
                <ListItem
                  key={orderModifier.id}
                  title={orderModifier.name}
                  onPress={() => {
                    this.props.navigation.navigate('ProductInformation',
                      { product })
                  }}/>
              )
            })}
          </Card>
        </View>
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

export default ProductOptions

const styles = StyleSheet.create({
  drinkText: {
    fontSize: 30,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 34,
    textAlign: 'center'
  },
})