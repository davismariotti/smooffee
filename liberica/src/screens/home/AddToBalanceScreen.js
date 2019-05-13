import React from 'react'
import { StyleSheet, View } from 'react-native'
import { compose, graphql } from 'react-apollo'
import { readUserCardsQuery } from '../../graphql/userQueries'
import AddToBalanceForm from './forms/AddToBalanceForm'
import LoadScreen from '../LoadScreen'
import { createPaymentMutation } from '../../graphql/paymentQueries'
import { StorageService } from '../../services/StorageService'

class AddToBalanceScreen extends React.Component {
  static navigationOptions = {
    // Don't show a header
    header: null
  }

  render() {

    const { readUserCardsQueryResult, createPaymentMutate } = this.props

    if (readUserCardsQueryResult.loading || readUserCardsQueryResult.error) {
      return (
        <LoadScreen/>
      )
    }

    const submit = async values => {
      createPaymentMutate({
        variables: {
          userId: await StorageService.getUserId(),
          paymentInput: {
            stripeCardId: values.stripeCardId,
            type: 'card',
            amount: values.amount
          }
        }
      }).then(() => {
        this.props.navigation.goBack()
      })
    }

    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <AddToBalanceForm onSubmit={submit} cards={readUserCardsQueryResult.user.currentUser.cards}/>
        </View>
      </View>
    )
  }
}

export default compose(
  graphql(readUserCardsQuery, {
    name: 'readUserCardsQueryResult'
  }),
  graphql(createPaymentMutation, {
    name: 'createPaymentMutate'
  })
)(AddToBalanceScreen)

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
