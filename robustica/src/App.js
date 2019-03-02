import React, { Component } from "react";
import firebaseApp from "./firebase/Firebase";
import { hashHistory } from "react-router";
import Navbar from "./Navbar";
import "./css/font-awesome.css";
import "./css/bootstrap-social.css";
import ApolloClient from "apollo-boost";
import { ApolloProvier } from "react-apollo";

const client = new ApolloClient({
  uri: "http://localhost:9000/graphql"
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedin: false };
  }
  componentWillMount() {
    let _this = this;
    firebaseApp.auth().onAuthStateChanged(function(user) {
      if (user) {
        //if logged in...
        _this.setState({ loggedin: true });
        hashHistory.push("/dashboard"); //after login, redirect to dashboard
      } else {
        //if not logged in...
        _this.setState({ loggedin: false });
      }
    });
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h4>Smooffee</h4>
        </div>
        <Navbar loggedin={this.state.loggedin} />
        {this.props.children}
      </div>
    );
  }
}

export default App;
