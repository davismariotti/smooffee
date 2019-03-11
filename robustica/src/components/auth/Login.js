import React, { Component } from 'react';
import isEmail from 'validator/lib/isEmail';
import {
  Button,
  Paper,
  Typography,
  FormControl,
  Input,
  InputLabel
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import firebaseApp from '../../services/AuthService';
import '../../css/index.css';

import { AUTH_TOKEN, LOGGED_USER_ID } from '../../constants';
import history from '../../utils/robusticaHistory';
import { GoogleSignIn } from './GoogleSignIn';
import { FacebookSignIn } from './FacebookSignIn';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      updateClientCallback: props.updateClientCallback
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.pushToHome = this.pushToHome.bind(this);
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value
    });
  }

  handlePassChange(e) {
    this.setState({
      password: e.target.value
    });
  }

  pushToHome() {
    history.push('/home');
  }

  handleSubmit(e) {
    const { email, password } = this.state;
    e.preventDefault();
    if (isEmail(email)) {
      firebaseApp
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(result => {
          const { updateClientCallback } = this.state;
          firebaseApp
            .auth()
            .currentUser.getToken()
            .then(token => {
              localStorage.setItem(AUTH_TOKEN, token);
              localStorage.setItem(LOGGED_USER_ID, result.user.uid);
              history.push('/home');
              updateClientCallback();
            });
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

  render() {
    const { email, password, updateClientCallback } = this.state;
    // const pushToHome = this.pushToHome
    return (
      <main>
        <Paper className="centerSquare">
          <Typography component="h6" variant="h5" align="center">
            Login Screen
          </Typography>
          <div align="center">
            <FacebookSignIn
              callback={this.pushToHome}
              updateClientCallback={updateClientCallback}
            />
            <GoogleSignIn
              callback={this.pushToHome}
              updateClientCallback={updateClientCallback}
            />
          </div>
          <form onSubmit={this.handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                type="email"
                name="email"
                autoComplete="email"
                value={this.state.email}
                onChange={this.handleEmailChange}
                autoFocus
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                type="password"
                name="password"
                id="password"
                autoComplete="current-password"
                value={this.state.password}
                onChange={this.handlePassChange}
              />
            </FormControl>
            <Button type="submit" fullWidth variant="contained">
              Submit
            </Button>
          </form>
          <p>
            Forgot Password<Link to="/recover"> Click Here</Link>
          </p>
          <p>
            Not Signed up yet? <Link to="/signup"> Sign Up</Link>
          </p>
        </Paper>
      </main>
    );
  }
}

export default Login;
