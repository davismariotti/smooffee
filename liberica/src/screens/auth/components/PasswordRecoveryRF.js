import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Button, View } from 'react-native'
import { Input } from 'react-native-elements'

const renderEmailField = ({input: {onChange, value}}) => {
  return (
    <Input
      placeholder="Email"
      leftIcon={{type: 'font-awesome', name: 'envelope'}}
      onChangeText={onChange}
      input={value}
    />
  )
}

class PasswordRecoveryRF extends Component {
  render() {
    const {handleSubmit} = this.props
    return (
      <View>
        <Field name="email" type="email" component={renderEmailField}/>
        <Button title="Submit" onPress={handleSubmit}/>
      </View>
    )
  }
}

export default reduxForm({
  form: 'passwordRecoveryForm'
})(PasswordRecoveryRF)
