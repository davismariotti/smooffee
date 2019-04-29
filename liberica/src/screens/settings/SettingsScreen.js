import React, { Component } from 'react'
import { Button, StyleSheet, View } from 'react-native'
import { AccountInfo } from './AccountInfo'

// export class AccountInfo extends React.Component {
//   static navigationOptions = {
//     title: 'Account Information',
//   }
//
//   render() {
//     return (
//       <View>
//         <Text> This is account information page</Text>
//       </View>
//     )
//   }
// }
//
// export class ChangePassword extends React.Component {
//   static navigationOptions = {
//     title: 'Change Password',
//   }
//
//   render() {
//     return (
//       <View>
//         <Text> This is where you can change your password</Text>
//       </View>
//     )
//   }
// }
//
// export class ShareFeedback extends React.Component {
//   static navigationOptions = {
//     title: 'Share Feedback',
//   }
//
//   render() {
//     return (
//       <View>
//         <Text> This where users can share their feedback </Text>
//       </View>
//     )
//   }
// }
//
// export class DeleteAccount extends React.Component {
//   static navigationOptions = {
//     title: 'Delete Account',
//   }
//
//   render() {
//     return (
//       <View>
//         <Text> This where user can delete their account </Text>
//       </View>
//     )
//   }
// }


const styles = StyleSheet.create({
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

export class SettingsScreen extends Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Button title="Account Information" onPress={() => {
            this.props.navigation.navigate('AccountInfo')
          }}/>
        </View>
      </View>
    )
  }
}


//         <Button
//           title="Change Password"
//           onPress={() => {
//             this.props.navigation.navigate('ChangePassword')
//           }
//           }/>
//         <Button
//           title="Share Feedback"
//           onPress={() => {
//             this.props.navigation.navigate('Share Feedback')
//           }
//           }/>
//         <Button
//           title="Delete Account"
//           onPress={() => {
//             this.props.navigation.navigate('DeleteAccount')
//           }
//           }/>