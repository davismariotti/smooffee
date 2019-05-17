import React from 'react'
import { Button, Image, StyleSheet, Text, View } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import ScrollingOrders from './components/ScrollingOrders'
import { graphql } from 'react-apollo'
import { readCurrentUserQuery } from '../../graphql/userQueries'
import { formatCurrency } from '../../utils/currencyUtils'
import LoadScreen from '../LoadScreen'
import { compose } from 'redux'

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  render() {

    const { readCurrentUserQueryResult } = this.props

    if (readCurrentUserQueryResult.loading || readCurrentUserQueryResult.error) {
      return (
        <LoadScreen/>
      )
    }

    const currentUser = readCurrentUserQueryResult.user.currentUser

    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={() => readCurrentUserQueryResult.refetch()}
        />
        <View style={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={require('../../assets/images/Cup.png')}
              style={styles.logoImage}
            />
            <Text style={styles.usernameText}>{`${currentUser.firstName} ${currentUser.lastName}`}</Text>
            <Text style={styles.currentBalanceText}>
              Current Balance: {formatCurrency(currentUser.balance)}
            </Text>
            <Button title="Add to Balance" onPress={() => this.props.navigation.navigate('AddToBalance')}/>
            <Button title="Refresh" onPress={() => readCurrentUserQueryResult.refetch()}/>
          </View>
          <ScrollingOrders style={styles.scrollingContainer} orders={readCurrentUserQueryResult.user.currentUser.orders}/>
        </View>
      </View>
    )
  }
}

export default compose(
  graphql(readCurrentUserQuery, {
    name: 'readCurrentUserQueryResult',
    fetchPolicy: 'network-only'
  })
)(HomeScreen)


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
    marginTop: 15,
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
