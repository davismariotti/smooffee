import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import AuthService from '../../services/AuthService'
import NavigationService from '../../services/NavigationService'

export class LogOut extends React.Component {
  static navigationOptions = {
    title: 'Log Out'
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

  render() {
    return (
      <View>
        <Text>Are you sure you want to log out?</Text>
        <Button title="Logout" onPress={() => {
          AuthService.signout()
          NavigationService.navigate('Auth')
        }}/>
      </View>
    )
  }
}