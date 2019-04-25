import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Button, TextInput, View } from "react-native";

const renderTextField = ({ input: { onChange, value } }) => {
  return <TextInput onChangeText={onChange} value={value} />;
};
const renderPasswordField = ({ input: { onChange, value } }) => {
  return <TextInput onChangeText={onChange} value={value} secureTextEntry />;
};


class LoginFormRF extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <View>
        <Field name="email" type="email" component={renderTextField} />
        <Field name="password" component={renderPasswordField} />
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    );
  }
}

export default reduxForm({
  form: "loginForm"
})(LoginFormRF);
