import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  IconButton,
  Typography,
  Button,
  Toolbar
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import history from '../utils/robusticaHistory';
import firebaseApp from '../services/AuthService';
import { AUTH_TOKEN } from '../constants';
import '../css/index.css';

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedin: props.loggedin
    };

    this.signout = this.signout.bind(this);
    this.classes = props;
  }

  signout() {
    firebaseApp
      .auth()
      .signOut()
      .then(
        () => {
          localStorage.setItem(AUTH_TOKEN, '');
          console.log('sign out succesful');
          history.push('/login');
        },
        () => {
          console.log('an error happened');
        }
      );
  }

  render() {
    let viewableNavBar;
    const { loggedin } = this.state;
    if (loggedin) {
      viewableNavBar = (
        <Toolbar>
          <IconButton className="navBar" color="inherit">
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" color="inherit">
            Smooffee
          </Typography>
          <Button className="navSignOut" onClick={this.signout} color="inherit">
            Sign Out
          </Button>
        </Toolbar>
      );
    } else {
      viewableNavBar = (
        <Toolbar>
          <Typography variant="h4" color="inherit">
            Smooffee
          </Typography>
        </Toolbar>
      );
    }
    return <AppBar position="static">{viewableNavBar}</AppBar>;
  }
}

Navbar.propTypes = {
  loggedin: PropTypes.bool.isRequired
};

export default Navbar;
