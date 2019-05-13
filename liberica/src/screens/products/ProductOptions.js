import React from 'react'
import { Button, Picker, StyleSheet, Text, View } from 'react-native'
import { Card, ListItem } from 'react-native-elements'
import { compose } from 'redux'
import { connect } from 'react-redux'
import OrderActions from './actions'


class ProductOptions extends React.Component {
  static navigationOptions = {
    title: 'Options'
  }

  state = { size: 'Small' }

  //TODO: need to deal with case where user does not change size
  changeSize(itemValue) {
    this.props.selectSize(itemValue)
    this.setState({ size: itemValue })

  }

  render() {
    const { navigation, selectedOrderModifiers } = this.props
    const product = navigation.getParam('product', {})
    return (
      <View>
        <Text style={styles.drinkText}>{product.name}</Text>
        <View>
          <Text>Choose Size</Text>
          <Picker
            style={{ height: 50, width: 100 }}
            selectedValue={this.state.size}
            onValueChange={(itemValue) => this.changeSize(itemValue)}
          >
            <Picker.Item id='1' label="Small" value="Small"/>
            <Picker.Item id='2' label="Medium" value="Medium"/>
            <Picker.Item id='3' label="Large" value="Large"/>
          </Picker>
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
                    this.props.selectOrderModifier(orderModifier.name)
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
  connect(mapStateToProps, mapDispatchToProps)
)(ProductOptions)

const styles = StyleSheet.create({
  drinkText: {
    fontSize: 30,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 34,
    textAlign: 'center'
  },
})