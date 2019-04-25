import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Button, View } from "react-native";
import { Input } from "react-native-elements"

const renderEmailField = ({ input: { onChange, value } }) => {
  return <Input
    placeholder='Email'
    leftIcon={{ type: 'font-awesome', name: 'envelope' }}
    onChangeText={onChange}
    input={value} />;
};
const renderPasswordField = ({ input: { onChange, value } }) => {
  return <Input
    placeholder='Password'
    leftIcon={{ type: 'font-awesome', name: 'unlock-alt' }}
    onChangeText={onChange}
    secureTextEntry input={value} />;
};


class LoginFormRF extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <View>
        <Field name="email" type="email" component={renderEmailField} />
        <Field name="password" component={renderPasswordField} />
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    );
  }
}

export default reduxForm({
  form: "loginForm"
})(LoginFormRF);
