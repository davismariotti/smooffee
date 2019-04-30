import React from 'react'
import { Platform } from 'react-native'
import { createAppContainer, createBottomTabNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation'
import TabBarIcon from '../components/TabBarIcon'
import HomeScreen from '../screens/HomeScreen'
import SettingsScreen from '../screens/SettingsScreen'
import LoginScreen from '../screens/auth/LoginScreen'
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen'
import ProductList from '../screens/products/ProductList'
import ProductInformation from '../screens/products/ProductInformation'
import NewUserScreen from '../screens/auth/NewUserScreen'
import { ProductOptions } from '../screens/products/ProductOptions'

const AuthStack = createStackNavigator({
  LoginScreen,
  ForgotPasswordScreen,
  NewUserScreen
})
const HomeStack = createStackNavigator({
  Home: HomeScreen
})
HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({focused}) => (
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
  ProductList,
  ProductOptions,
  ProductInformation
})
NewOrderStack.navigationOptions = {
  tabBarLabel: 'New Order',
  tabBarIcon: ({focused}) => (
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
  tabBarIcon: ({focused}) => (
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
      initialRouteName: 'App'
    }
  )
)
