import React from 'react'
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation'
import MainTabNavigator from './MainTabNavigator'
import HomeScreen from '../screens/HomeScreen'
import SettingsScreen from '../screens/SettingsScreen'
import OrderStack from '../screens/NewOrderScreen'
import LoginScreen from '../screens/LoginScreen'
import SplashScreen from '../screens/SplashScreen'

const AuthStack =createStackNavigator({Login: LoginScreen})

export default createAppContainer(createSwitchNavigator(
  {
    Loading: SplashScreen,
    App: MainTabNavigator,
    Order: OrderStack,
    Auth: AuthStack,
  },
  {
    initialRouteName:'App',
  }
));
