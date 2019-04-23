import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import ScrollingOrders from '../components/ScrollingOrders'

export default class HomeScreen extends React.Component {
  state = {
    currentUser: 'Joe Tester',
    email: 'joe.tester@tester.com',
    userBalance: '0.00'
  }

  static navigationOptions = {
    //dont show a header
    header: null
  }

  render() {
    const {currentUser, email, userBalance} = this.state

    if (this.state.ordersExist) {
    }

    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={require('../assets/images/Cup.png')}
              style={styles.logoImage}
            />
            <Text style={styles.usernameText}>{currentUser}</Text>
            <Text>{email}</Text>
            <Text style={styles.currentBalanceText}>
              Current Balance: ${userBalance}
            </Text>
          </View>
          <ScrollingOrders style={styles.scrollingContainer}/>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  scrollingContainer: {
    flex: 1
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  logoImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 5,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  usernameText: {
    fontSize: 30,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 34,
    textAlign: 'center'
  },
  currentBalanceText: {
    fontSize: 20,
    color: 'green',
    textAlign: 'left',
    lineHeight: 30
  }
})
