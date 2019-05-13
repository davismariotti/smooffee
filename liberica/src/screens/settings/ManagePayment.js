import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { ListItem } from 'react-native-elements'
import stripe from 'tipsi-stripe'
import { compose } from 'redux'
import { graphql } from 'react-apollo'
import { attachCardMutation, readUserCardsQuery } from '../../graphql/userQueries'
import { StorageService } from '../../services/StorageService'

stripe.setOptions({
  publishableKey: 'pk_test_p1QAaMbJyo8fsexmsg6zRsrB',
})
//
// const cards = [
//   {
//     last4: '4242',
//     brand: 'Visa',
//     stripeCardId: 'ca_fnbjhds43fhg34jcgh3c78'
//   },
//   {
//     last4: '4444',
//     brand: 'Amex',
//     stripeCardId: 'ca_fnbjhewf43fhg34jcgh3c78'
//   },
//   {
//     end: true,
//     stripeCardId: 'endKey'
//   }
// ]

class ManagePayment extends React.Component {
  constructor(props) {
    super(props)
    this.requestPayment = this.requestPayment.bind(this)
  }

  static navigationOptions = {
    title: 'Manage Payment'
  }

  static styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 15,
    },
    optionsTitleText: {
      fontSize: 16,
      marginLeft: 15,
      marginTop: 9,
      marginBottom: 12,
    },
    optionIconContainer: {
      marginRight: 9,
    },
    option: {
      backgroundColor: '#fdfdfd',
      paddingHorizontal: 15,
      paddingVertical: 15,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#EDEDED',
    },
    optionText: {
      fontSize: 15,
      marginTop: 1,
    },
  })

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#CED0CE',
          marginLeft: '5%',
          marginRight: '5%'
        }}
      />
    )
  }

  requestPayment = () => {
    const { attachCardMutate, readUserCardsQueryResult } = this.props
    return stripe
      .paymentRequestWithCardForm({
        requiredBillingAddressFields: 'zip'
      })
      .then(async stripeTokenInfo => {
        console.warn('Token created', { stripeTokenInfo })
        return attachCardMutate({
          variables: {
            userId: await StorageService.getUserId(),
            stripeToken: stripeTokenInfo.tokenId
          }
        })
      })
      .then(() => {
        readUserCardsQueryResult.refetch()
      })
      .catch(error => {
        console.warn('Payment failed', { error })
      })
  }

  render() {
    const { readUserCardsQueryResult } = this.props

    let cards = readUserCardsQueryResult.user && readUserCardsQueryResult.user.currentUser.cards || []
    cards.push({ end: true, stripeCardId: 'endKey' })

    return (
      <View>
        <Text>Current methods of payments</Text>
        <FlatList
          data={cards}
          keyExtractor={item => item.stripeCardId}
          renderItem={({ item }) => {
            if (item.end) {
              return (
                <ListItem
                  title="Add another card"
                  containerStyle={{ borderBottomWidth: 0 }}
                  onPress={this.requestPayment}
                />)
            }
            return (
              <ListItem
                title={`${item.brand} **** **** **** ${item.last4}`}
                containerStyle={{ borderBottomWidth: 0 }}
                onPress={() => {}}
              />
            )
          }}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    )
  }
}

export default compose(
  graphql(readUserCardsQuery, {
    name: 'readUserCardsQueryResult'
  }),
  graphql(attachCardMutation, {
    name: 'attachCardMutate'
  })
)(ManagePayment)
