/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import AppNavigator from './navigation/AppNavigator'
import NavigationService from './services/NavigationService'
import createNewStore from './services/store'
import { ApolloProvider } from 'react-apollo'
import { client } from './services/apollo'

import { createAppContainer } from 'react-navigation'

const AppContainer = createAppContainer(AppNavigator)

console.disableYellowBox = true

const store = createNewStore()

export default class App extends Component<Props> {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <AppContainer ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef)
          }}/>
        </Provider>
      </ApolloProvider>
    )
  }
}
