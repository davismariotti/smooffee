import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import firebaseApp from '../services/AuthService';
import {AUTH_TOKEN} from '../constants'

class Navbar extends Component {
  constructor(props) {
    super(props);
    //
    this.signout = this.signout.bind(this);
  }

  signout() {
    firebaseApp
      .auth()
      .signOut()
      .then(
        function() {
          localStorage.setItem(AUTH_TOKEN, '');
          console.log('sign out succesful');
          browserHistory.push('/login');
        },
        function(error) {
          console.log('an error happened');
        }
      );
  }

  render() {
    let loginButton;
    let signup;
    if (this.props.loggedin) {
      loginButton = (
        <button className="btn btn-default" onClick={this.signout}>
          Logout
        </button>
      );
      signup = '';
    } else {
      loginButton = (
        <Link to="/login">
          <button className="btn btn-default">login</button>
        </Link>
      );
      signup = (
        <Link to="/signup">
          <button className="btn btn-default">Sign up</button>
        </Link>
      );
    }
    return (
      <div className="Navbar">
        {loginButton}
        {signup}
      </div>
    );
  }
}

export default Navbar;
