import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Button, View } from 'react-native'
import { Input } from 'react-native-elements'

const renderEmailField = ({ input: { onChange, value } }) => {
  return <Input
    placeholder='Email'
    leftIcon={{ type: 'font-awesome', name: 'envelope' }}
    onChangeText={onChange}
    input={value}/>
}
const renderPasswordField = ({ input: { onChange, value } }) => {
  return <Input
    placeholder='Password'
    leftIcon={{ type: 'font-awesome', name: 'unlock-alt' }}
    onChangeText={onChange}
    secureTextEntry input={value}/>
}

const renderNormalField = ({ placeholder, input: { onChange, value } }) => {
  return <Input
    placeholder={placeholder}
    leftIcon={{ type: 'font-awesome', name: 'user-circle' }}
    onChangeText={onChange}
    input={value}/>
}

class LoginFormRF extends Component {
  render() {
    const { handleSubmit } = this.props
    return (
      <View>
        <Field name="email" type="email" component={renderEmailField}/>
        <Field name="password" component={renderPasswordField}/>
        <Field name="firstName" placeholder="First Name" component={renderNormalField}/>
        <Field name="lastName" placeholder="Last Name" component={renderNormalField}/>
        <Button title="Submit" onPress={handleSubmit}/>
      </View>
    )
  }
}

export default reduxForm({
  form: 'signUpForm'
})(LoginFormRF)
