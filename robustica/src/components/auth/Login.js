import React, { Component } from 'react';
import * as firebase from 'firebase';
import isEmail from 'validator/lib/isEmail';
import {
  CssBaseline,
  Button,
  Paper,
  Typography,
  withStyles
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import firebaseApp from '../../services/AuthService';
import { AUTH_TOKEN } from '../../constants';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
    //
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  postLoginRedirect() {
    firebaseApp
      .auth()
      .currentUser.getToken()
      .then(token => {
        localStorage.setItem(AUTH_TOKEN, token);
        // browserHistory.push('/home');
        window.location.reload();
      });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePassChange(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const email = this.state.email.trim();
    const password = this.state.password.trim();
    if (isEmail(email)) {
      firebaseApp
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          this.postLoginRedirect();
        })
        .catch(error => {
          // Handle Errors here.
          const errorMessage = error.message;
          alert(`errorMessage: ${errorMessage}`);
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
        this.postLoginRedirect();
      })
      .catch(error => {
        const errorMessage = error.message;
        alert(`Facebook sign in error: ${errorMessage}`);
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
        this.postLoginRedirect();
      })
      .catch(error => {
        const errorMessage = error.message;
        alert(`Google sign in error: ${errorMessage}`);
      });
  }

  render() {
    return (
      <main>
        <Paper>
          <Typography component="h1" variant="h5">
            Login Screen
          </Typography>
          <Button onClick={this.handleFacebook}>Sign in with Facebook</Button>
          <Button onClick={this.handleGoogle}>Sign in with Google</Button>
          <br />
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
            <br />
            <Button>Submit</Button>
          </form>
          <br />
          <br />
          <p>
            Forgot Password? <Link to="/recover"> Click Here</Link>
          </p>
          <p>
            Not SIgned up yet? <Link to="/signup"> Sign Up</Link>
          </p>
        </Paper>
      </main>
    );
  }
}

export default Login;
