import React from 'react'
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation'
import MainTabNavigator from './MainTabNavigator'
import HomeScreen from '../screens/HomeScreen'
import SettingsScreen from '../screens/SettingsScreen'
import NewOrderScreen from '../screens/NewOrderScreen'
import LoginScreen from '../screens/LoginScreen'
import SplashScreen from '../screens/SplashScreen'

const AppStack = createStackNavigator({Home:HomeScreen,NewOrderScreen,SettingsScreen})
const AuthStack =createStackNavigator({Login: LoginScreen})

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: SplashScreen,
    App: MainTabNavigator,
    Auth: AuthStack,
  },
  {
    initialRouteName:'App',
  }
));
