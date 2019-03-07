import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import firebaseApp from '../services/AuthService';
import {AUTH_TOKEN} from '../constants'
import history from '../utils/robusticaHistory'

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
        () => {
          localStorage.setItem(AUTH_TOKEN, '');
          console.log('sign out succesful');
          history.push('/')
        },
        () => {
          console.log('an error happened');
        }
      );
  }

  render() {
    let loginButton;
    let signup;
    const { loggedin } = this.props
    if (loggedin) {
      loginButton = (
        <button type="submit" className="btn btn-default" onClick={this.signout}>
          Logout
        </button>
      );
      signup = '';
    } else {
      loginButton = (
        <Link to="/login">
          <button type="submit" className="btn btn-default">login</button>
        </Link>
      );
      signup = (
        <Link to="/signup">
          <button type="submit" className="btn btn-default">Sign up</button>
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

Navbar.propTypes = {
  loggedin: PropTypes.bool.isRequired
};

export default Navbar;
