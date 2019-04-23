import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Touchable from 'react-native-platform-touchable'

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  }

  render() {
    return (
      <View>
        <Touchable
          style={styles.option}
          background={Touchable.Ripple('#ccc', false)}
          onPress={this._handleEditUserInfo}>
          <View style={{flexDirection: 'row'}}>

            <View style={styles.optionTextContainer}>
              <Text style={styles.optionText}>
                Get Help
              </Text>
            </View>
          </View>
        </Touchable>

        <Touchable
          style={styles.option}
          background={Touchable.Ripple('#ccc', false)}
          onPress={this._handleEditUserInfo}>
          <View style={{flexDirection: 'row'}}>

            <View style={styles.optionTextContainer}>
              <Text style={styles.optionText}>
                Manage Payment Options
              </Text>
            </View>
          </View>
        </Touchable>

        <Touchable
          style={styles.option}
          background={Touchable.Ripple('#ccc', false)}
          onPress={this._handleEditUserInfo}>
          <View style={{flexDirection: 'row'}}>

            <View style={styles.optionTextContainer}>
              <Text style={styles.optionText}>
                Change Password
              </Text>
            </View>
          </View>
        </Touchable>
        <Touchable
          style={styles.option}
          background={Touchable.Ripple('#ccc', false)}
          onPress={this._handleEditUserInfo}>
          <View style={{flexDirection: 'row'}}>

            <View style={styles.optionTextContainer}>
              <Text style={styles.optionText}>
                Edit User Information
              </Text>
            </View>
          </View>
        </Touchable>
        <Touchable
          style={styles.option}
          background={Touchable.Ripple('#ccc', false)}
          onPress={this._handleEditUserInfo}>
          <View style={{flexDirection: 'row'}}>

            <View style={styles.optionTextContainer}>
              <Text style={styles.optionText}>
                Share Ideas/Feedback
              </Text>
            </View>
          </View>
        </Touchable>

        <Touchable
          style={styles.option}
          background={Touchable.Ripple('#ccc', false)}
          onPress={this._handleEditUserInfo}>
          <View style={{flexDirection: 'row'}}>

            <View style={styles.optionTextContainer}>
              <Text style={styles.optionText}>
                Delete account
              </Text>
            </View>
          </View>
        </Touchable>

      </View>
    )
  }


  _handleEditUserInfo = () => {

  }


}

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
