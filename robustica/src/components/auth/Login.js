import React, { Component } from 'react';
import * as firebase from 'firebase';
import isEmail from 'validator/lib/isEmail';
import {
  Button,
  Paper,
  Typography,
  withStyles,
  CssBaseline,
  FormControl,
  Input,
  InputLabel
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import firebaseApp from '../../services/AuthService';
import { AUTH_TOKEN } from '../../constants';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
    //
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.classes = props;
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
      <main className={this.classes.main}>
        <CssBaseline />
        <Paper className={this.classes.paper}>
          <Typography component="h1" variant="h5">
            Login Screen
          </Typography>
          <Button onClick={this.handleFacebook}>Sign in with Facebook</Button>
          <Button onClick={this.handleGoogle}>Sign in with Google</Button>

          <form className={this.classes.form} onSubmit={this.handleSubmit}>
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
          </form>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={this.classes.submit}
          >
            Submit
          </Button>
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

export default withStyles(styles)(Login);
