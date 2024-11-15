import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export class ChangePassword extends React.Component {
  static navigationOptions = {
    title: 'Change password'
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
        <Text> add change your password form here</Text>
      </View>
    )
  }
}