import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import firebaseApp from '../services/AuthService';
import 'firebase/auth';
import Navbar from './Navbar';
import '../css/font-awesome.css';
import '../css/bootstrap-social.css';
import { AUTH_TOKEN } from '../constants';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedin: false };
  }

  componentWillMount() {
    const _this = this;
    firebaseApp.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log(user);
        // If logged in...
        _this.setState({ loggedin: true });
        hashHistory.push('/home'); // After login, redirect to home

        user.getToken()
          .then(function(result) {
            localStorage.setItem(AUTH_TOKEN, result);
            console.log('Test Two', result);
          });
      } else {
        // If not logged in...
        _this.setState({ loggedin: false });
        hashHistory.get();
      }
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h4>Smooffee</h4>
        </div>
        <Navbar loggedin={this.state.loggedin}/>
        {this.props.children}
      </div>
    );
  }
}

export default App;
