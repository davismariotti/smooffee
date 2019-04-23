import React from 'react'
import { Button, Picker, ScrollView, StyleSheet, Text, View } from 'react-native'

export class Order extends React.Component {
  static navigationOptions = {
    title: 'Order'
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Button
          title="Smoothee"
          onPress={() => {
            this.props.navigation.navigate('Options', {
              itemId: 1,
              item: 'Smoothee'
            })
          }}
        />
        <Button
          title="Drip Coffee"
          onPress={() => {
            this.props.navigation.navigate('Options', {
              itemId: 2,
              item: 'Drip coffee'
            })
          }}
        />
      </ScrollView>
    )
  }
}

export class Options extends React.Component {
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

export class Information extends React.Component {
  static navigationOptions = {
    title: 'Information'
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Finalize Order with notes, location, and delivery time</Text>
        <Button
          title="Submit"
          onPress={() => {
            this.props.navigation.navigate('Order')
          }}
        />
      </ScrollView>
    )
  }
}

export default class NewOrderScreen extends React.Component {
  static navigationOptions = {
    //dont show a header
    header: null
  }

  render() {
    return <OrderContainer style={styles.container}/>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  sectionContainer: {
    fontSize: 20,
    color: 'green',
    textAlign: 'left',
    lineHeight: 100
  },
  drinkText: {
    fontSize: 30,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 34,
    textAlign: 'center'
  }
})
