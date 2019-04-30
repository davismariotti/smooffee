import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import ScrollingOrders from './home/components/ScrollingOrders'
import { graphql } from 'react-apollo'
import { readCurrentUserQuery } from '../graphql/userQueries'
import { formatCurrency } from '../utils/currencyUtils'
import LoadScreen from './LoadScreen'

class HomeScreen extends React.Component {
  static navigationOptions = {
    //dont show a header
    header: null
  }

  render() {

    const {readCurrentUserQueryResult} = this.props

    if (readCurrentUserQueryResult.loading || readCurrentUserQueryResult.error) {
      return (
        <LoadScreen/>
      )
    }

    const balance = (readCurrentUserQueryResult.user && readCurrentUserQueryResult.user.currentUser.balance) || ''
    const firstName = (readCurrentUserQueryResult.user && readCurrentUserQueryResult.user.currentUser.firstName) || ''
    const lastName = (readCurrentUserQueryResult.user && readCurrentUserQueryResult.user.currentUser.lastName) || ''
    const email = (readCurrentUserQueryResult.user && readCurrentUserQueryResult.user.currentUser.email) || ''

    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={require('../assets/images/Cup.png')}
              style={styles.logoImage}
            />
            <Text style={styles.usernameText}>{`${firstName} ${lastName}`}</Text>
            <Text>{email}</Text>
            <Text style={styles.currentBalanceText}>
              Current Balance: {formatCurrency(balance)}
            </Text>
          </View>
          <ScrollingOrders style={styles.scrollingContainer}/>
        </View>
      </View>
    )
  }
}

export default graphql(readCurrentUserQuery, {
  name: 'readCurrentUserQueryResult'
})
(HomeScreen)


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
