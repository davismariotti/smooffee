import React, { Component } from "react";

class Login extends Component {
  state = {};
  render() {
    return (
      <div>
        <textarea name="username">Username</textarea>
        <textarea name="password">Password</textarea>
        <button onClick="">Login</button>
      </div>
    );
  }
}

export default Login;
