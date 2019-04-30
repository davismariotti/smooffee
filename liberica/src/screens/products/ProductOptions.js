import React from 'react'
import { Button, Picker, Text, View } from 'react-native'

export class ProductOptions extends React.Component {
  static navigationOptions = {
    title: 'Options'
  }

  render() {
    const {navigation} = this.props
    const itemId = navigation.getParam('itemId', 'NO-ID')
    const drinkOrdered = navigation.getParam('item', 'error')
    return (
      <View style={styles.container}>
        <Text style={styles.drinkText}>{drinkOrdered}</Text>
        <View style={styles.sectionContainer}>
          <Text>Choose Size</Text>
          <Picker style={{height: 50, width: 100}}>
            <Picker.Item label="Small" value="Small"/>
            <Picker.Item label="Medium" value="Medium"/>
            <Picker.Item label="Large" value="Large"/>
          </Picker>
          {/* <CheckBox title="Medium" checked={this.state.checked} />
            <CheckBox title="Large" checked={this.state.checked} /> */}
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