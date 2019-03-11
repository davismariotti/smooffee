import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  IconButton,
  Typography,
  Toolbar,
  Menu,
  MenuItem
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Face from '@material-ui/icons/Face';
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

  handleRightMenuClick = event => {
    this.setState({ rightMenu: event.currentTarget });
  };
  handleLeftMenuClick = event => {
    this.setState({ leftMenu: event.currentTarget });
  };
  handleLeftClose = () => {
    this.setState({ leftMenu: null });
  };
  handleRightClose = () => {
    this.setState({ rightMenu: null });
  };

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
    const { leftMenu } = this.state;
    const { rightMenu } = this.state;

    if (!loggedin) {
      viewableNavBar = (
        <Toolbar className="navBar">
          <IconButton color="inherit" onClick={this.handleLeftMenuClick}>
            <MenuIcon />
          </IconButton>

          <Menu
            id="simple-menu"
            anchorEl={leftMenu}
            open={Boolean(leftMenu)}
            onClose={this.handleLeftClose}
          >
            <MenuItem>Option1</MenuItem>
            <MenuItem>Option2</MenuItem>
          </Menu>
          <Typography variant="h4" color="inherit">
            Smooffee
          </Typography>
          <IconButton
            align="right"
            color="inherit"
            onClick={this.handleRightMenuClick}
          >
            <Face />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={rightMenu}
            open={Boolean(rightMenu)}
            onClose={this.handleRightClose}
          >
            <MenuItem>Profile</MenuItem>
            <MenuItem>My account</MenuItem>
            <MenuItem>Logout</MenuItem>
          </Menu>
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
