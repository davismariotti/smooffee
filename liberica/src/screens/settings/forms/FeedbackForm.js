import React from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { Field, reduxForm } from 'redux-form'
import { compose } from 'redux'

const renderMessageField = ({ input: { onChange, value } }) => {
  return <TextInput
    style={{ height: 70, borderColor: 'gray', borderWidth: 1 }}
    placeholder='Your message here'
    onChangeText={onChange}
    value={value}/>
}

class FeedbackForm extends React.Component {

  render() {
    const { handleSubmit } = this.props
    return (
      <View style={styles.container}>
        <Text>What are your thoughts about this app? What improvements do we need to implement? Let us know below</Text>
        <Field name="message" component={renderMessageField}/>
        <Button title="Submit" onPress={handleSubmit}/>
      </View>
    )
  }
}

export default compose(
  reduxForm({
    form: 'feedbackForm'
  })
)(FeedbackForm)

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
})