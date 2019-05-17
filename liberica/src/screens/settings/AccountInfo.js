import React from 'react'
import { StyleSheet, View } from 'react-native'
import EditUserForm from './forms/EditUserForm'
import { compose } from 'redux'
import { graphql } from 'react-apollo'
import { Toast } from 'native-base'
import { readCurrentUserQuery, updateUserMutation } from '../../graphql/userQueries'
import { StorageService } from '../../services/StorageService'
import LoadScreen from '../LoadScreen'

class AccountInfo extends React.Component {
  static navigationOptions = {
    title: 'Account Information'
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

    const { updateUserMutate, readCurrentUserQueryResult } = this.props

    const submit = async ({ firstName, lastName }) => {
      updateUserMutate({
        variables: {
          userId: await StorageService.getUserId(),
          userInput: {
            firstName,
            lastName
          }
        }
      }).then(() => {
        Toast.show({
          text: 'Success!',
          buttonText: 'OK',
          duration: 3000,
          type: 'success'
        })
      })
    }

    if (readCurrentUserQueryResult.loading || readCurrentUserQueryResult.error) {
      return (
        <LoadScreen/>
      )
    }

    const currentUser = readCurrentUserQueryResult.user.currentUser

    return (
      <View>
        <EditUserForm onSubmit={submit} currentUser={currentUser}/>
      </View>
    )
  }
}

export default compose(
  graphql(updateUserMutation, {
    name: 'updateUserMutate'
  }),
  graphql(readCurrentUserQuery, {
    name: 'readCurrentUserQueryResult'
  })
)(AccountInfo)