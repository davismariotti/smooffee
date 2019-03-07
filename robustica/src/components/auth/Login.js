import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import * as firebase from 'firebase';
import isEmail from 'validator/lib/isEmail';
import React, { Component } from 'react';
import firebaseApp from '../../services/AuthService';
import {AUTH_TOKEN} from '../../constants'
import history from '../../utils/robusticaHistory'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' }
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePassChange = this.handlePassChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    // this.postLoginRedirect = this.postLoginRedirect.bind(this)
  }

  // postLoginRedirect() {
  //   firebaseApp.auth().currentUser.getToken().then((token) => {
  //     localStorage.setItem(AUTH_TOKEN, token)
  //     history.push('/home')
  //   })
  // }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value
    })
  }

  handlePassChange(e) {
    this.setState({
      password: e.target.value
    })
  }

  handleSubmit(e) {
    const { email, password } = this.state
    e.preventDefault()
    if (isEmail(email)) {
      firebaseApp
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          firebaseApp.auth().currentUser.getToken().then((token) => {
            localStorage.setItem(AUTH_TOKEN, token)
            history.push('/home')
          })
        })
        .catch((error) => {
          // Handle Errors here.
          const errorMessage = error.message;
          alert(`errorMessage: ${  errorMessage}`);
        });
    } else {
      alert('Email Address is not valid');
    }
  }

  handleFacebook(e) {
    e.preventDefault();
    const provider = new firebase.auth.FacebookAuthProvider();
    firebaseApp
      .auth()
      .signInWithPopup(provider)
      .then(() => {
        console.log('Facebook login success');
        firebaseApp.auth().currentUser.getToken().then((token) => {
          localStorage.setItem(AUTH_TOKEN, token)
          history.push('/home')
        })
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(`Facebook sign in error: ${  errorMessage}`);
      });
  }

  handleGoogle(e) {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebaseApp
      .auth()
      .signInWithPopup(provider)
      .then(() => {
        console.log('Google login success');
        firebaseApp.auth().currentUser.getToken().then((token) => {
          localStorage.setItem(AUTH_TOKEN, token)
          history.push('/home')
        })
      })
      .catch((error) => {
        console.error(error)
        const errorMessage = error.message;
        alert(`Google sign in error: ${  errorMessage}`);
      });
  }

  render() {
    return (
      <div className="Login">
        <h1>Login Screen</h1>
        <div className="col-md-4"/>
        <div className="form-group col-md-4">
          <button type="submit"
            className="btn btn-block btn-social btn-facebook"
            onClick={this.handleFacebook}
          >
            <span className="fa fa-facebook"/>
            Sign in with Facebook
          </button>
          <button type="submit"
            className="btn btn-block btn-social btn-google"
            onClick={this.handleGoogle}
          >
            <span className="fa fa-google"/>
            Sign in with Google
          </button>
          <br/>
          <p className="text-center">------------- Or -------------</p>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              className="form-control"
              value={this.state.email}
              onChange={this.handleEmailChange}
              placeholder="Enter Email"
            />
            <input
              type="password"
              className="form-control"
              value={this.state.password}
              onChange={this.handlePassChange}
              placeholder="Enter Password"
            />
            <br/>
            <button type="submit" className="btn btn-default">
              Submit
            </button>
          </form>
          <br/>
          <br/>
          <p>
            Forgot Password? <Link to="/recover"> Click Here</Link>
          </p>
          <p>
            Not SIgned up yet? <Link to="/signup"> Sign Up</Link>
          </p>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  updateClientCallback: PropTypes.func.isRequired
};

export default Login;
