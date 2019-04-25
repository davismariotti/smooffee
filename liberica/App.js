/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native'
import LoginForm from './components/LoginForm'
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'
import { reducer as formReducer } from 'redux-form'
import AppNavigator from './navigation/AppNavigator'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
})

type Props = {}

const rootReducer = combineReducers({
  form: formReducer
})

const store = createStore(rootReducer)

export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    )
  }
}
