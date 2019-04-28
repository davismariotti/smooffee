import React from "react";
import { Text, View, StyleSheet, Image, Button } from "react-native";
import PasswordRecoveryRF from "./components/PasswordRecoveryRF";
import AuthMiddleware from "./middleware/AuthMiddleware";
import { connect } from "react-redux";

export class ForgotPasswordScreen extends React.Component {
  static navigationOptions = {
    title: "ForgotPassword",
    header: null
  };

  render() {
    const { recoverWithEmail } = this.props;

    const submit = ({ email }) => {
      recoverWithEmail(email);
    };
    return (
      <View>
        <Text style={styles.title}>Send Password Recovery to Email</Text>
        <PasswordRecoveryRF onSubmit={submit} />
        <Button
          title="Back to Login"
          onPress={() => {
            this.props.navigation.navigate("LoginScreen");
          }}
        />
      </View>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    recoverWithEmail: email => AuthMiddleware.recoverWithEmail(email)(dispatch)
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ForgotPasswordScreen);
const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginTop: 30,
    marginLeft: 110
  },
  title: {
    fontSize: 30,
    marginTop: 10,
    color: "rgba(96,100,109, 1)",
    lineHeight: 50,
    textAlign: "center"
  }
});
