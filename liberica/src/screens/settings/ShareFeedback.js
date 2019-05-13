import React from 'react'
import { StyleSheet, View } from 'react-native'
import FeedbackForm from './forms/FeedbackForm'
import { compose } from 'redux'
import { graphql } from 'react-apollo'
import { sendFeedbackMutation } from '../../graphql/userQueries'

class ShareFeedback extends React.Component {
  static navigationOptions = {
    title: 'Share Feedback'
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
    const { sendFeedbackMutate } = this.props

    const submit = values => {
      sendFeedbackMutate({
        variables: {
          message: values.message
        }
      }).then(() => {
        this.props.navigation.goBack()
      })
    }

    return (
      <View>
        <FeedbackForm onSubmit={submit}/>
      </View>
    )
  }
}

export default compose(
  graphql(sendFeedbackMutation, {
    name: 'sendFeedbackMutate'
  })
)(ShareFeedback)
