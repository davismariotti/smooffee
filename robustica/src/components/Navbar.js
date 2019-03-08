import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  AppBar,
  IconButton,
  Typography,
  Button,
  Toolbar
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import firebaseApp from '../services/AuthService';
import { AUTH_TOKEN } from '../constants';

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
    alignItems: 'center'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

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
          // browserHistory.push('/login');
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
          <IconButton className={this.classes.menuButton} color="inherit">
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h4"
            color="inherit"
            className={this.classes.grow}
          >
            Smooffee
          </Typography>
          <Button
            type={this.classes.menuButton}
            onClick={this.signout}
            color="inherit"
          >
            Logout
          </Button>
        </Toolbar>
      );
    } else {
      viewableNavBar = (
        <Toolbar>
          <Typography
            variant="h4"
            color="inherit"
            className={this.classes.grow}
          >
            Smooffee
          </Typography>
        </Toolbar>
      );
    }
    return (
      <div className={this.classes.root}>
        <AppBar position="static">{viewableNavBar}</AppBar>
      </div>
    );
  }
}

Navbar.propTypes = {
  loggedin: PropTypes.bool.isRequired
};

export default withStyles(styles)(Navbar);
