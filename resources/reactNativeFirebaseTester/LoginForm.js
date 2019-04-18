import React, { Component } from "react";
import LoginFormRF from "./LoginFormRF";

class LoginForm extends Component {
  handleSubmit = values => {
    console.log("Submitted");
  };
  render() {
    return <LoginFormRF onSubmit={this.handleSubmit} />;
  }
}

export default LoginForm;
