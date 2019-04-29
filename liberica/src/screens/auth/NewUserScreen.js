import React from "react";
import { Text, View, StyleSheet, Image, Button } from "react-native";
import LoginFormRF from "./components/LoginFormRF";
import AuthMiddleware from "./middleware/AuthMiddleware";
import { connect } from "react-redux";

class NewUserScreen extends React.Component {
  static navigationOptions = {
    title: "New User Screen",
    header: null
  };

  render() {
    const { createUserWithEmailAndPassword } = this.props;

    const submit = ({ email, password }) => {
      createUserWithEmailAndPassword(email, password);
    };
    return (
      <View>
        <Text style={styles.title}>Create Account</Text>
        <LoginFormRF onSubmit={submit} />
        <Button
          title="Already Have an Account?"
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
    createUserWithEmailAndPassword: (email, password) =>
      AuthMiddleware.createUserWithEmailAndPassword(email, password)(dispatch)
  };
};

export default connect(
  null,
  mapDispatchToProps
)(NewUserScreen);
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