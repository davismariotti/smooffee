import React from 'react'
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation'
import MainTabNavigator from './MainTabNavigator'
import HomeScreen from '../screens/HomeScreen'
import SettingsScreen from '../screens/SettingsScreen'
import LinksScreen from '../screens/LinksScreen'
import LoginScreen from '../screens/LoginScreen'
import SplashScreen from '../screens/SplashScreen'

const AppStack = createStackNavigator({Home:HomeScreen,LinksScreen,SettingsScreen})
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
