import React from 'react'
import { Platform } from 'react-native'
import { createAppContainer, createBottomTabNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation'
import TabBarIcon from '../components/TabBarIcon'
import HomeScreen from '../screens/HomeScreen'
import SettingsScreen from '../screens/SettingsScreen'
import { Information, Options, Order } from '../screens/NewOrderScreen'
import LoginScreen from '../screens/LoginScreen'
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen'
import NewUserScreen from '../screens/NewUserScreen'
import UserConfirmationScreen from '../screens/UserConfirmationScreen'
const AuthStack = createStackNavigator({
  LoginScreen,
  ForgotPasswordScreen,
  NewUserScreen,
  UserConfirmationScreen
})
const HomeStack = createStackNavigator({
  Home: HomeScreen
})
HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  )
}

const NewOrderStack = createStackNavigator({
  Order,
  Options,
  Information
})
NewOrderStack.navigationOptions = {
  tabBarLabel: 'New Order',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-cafe' : 'md-cafe'}
    />
  )
}

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
})
SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  )
}
const TabNavigator = createBottomTabNavigator({
  Home: HomeStack,
  NewOrderStack,
  SettingsStack
})
export default createAppContainer(
  createSwitchNavigator(
    {
      App: TabNavigator,
      Auth: AuthStack
    },
    {
      initialRouteName: 'Auth'
    }
  )
)
