import React, { Component } from 'react'
import * as PropTypes from 'prop-types'
import { AppBar, IconButton, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import Face from '@material-ui/icons/Face'
import { AuthService } from '../services/AuthService'
import history from '../utils/history'
import '../css/index.css'
import UserInfo from './UserInfo'
import Options from './options'

class Navbar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      leftMenu: null,
      rightMenu: null
    }

    this.classes = props
  }

  handleRightMenuClick = event => {
    this.setState({ rightMenu: event.currentTarget })
  }

  handleLeftMenuClick = event => {
    this.setState({ leftMenu: event.currentTarget })
  }

  handleLeftClose = () => {
    this.setState({ leftMenu: null })
  }

  handleRightClose = () => {
    this.setState({ rightMenu: null })
  }

  handleLogout = () => {
    AuthService.signout()
    this.loggedin = false
    history.push('/login')
  }

  render() {
    const { loggedin } = this.props
    const { leftMenu, rightMenu } = this.state

    let viewableNavBar
    if (loggedin) {
      viewableNavBar = (
        <Toolbar className="navBar">
          <IconButton color="inherit" onClick={this.handleLeftMenuClick}>
            <MenuIcon />
          </IconButton>
          <Menu id="simple-menu" anchorEl={leftMenu} open={Boolean(leftMenu)} onClose={this.handleLeftClose}>
            <Options />
          </Menu>
          <Typography variant="h4" color="inherit">
            Smooffee
          </Typography>
          <IconButton align="right" color="inherit" onClick={this.handleRightMenuClick}>
            <Face />
          </IconButton>
          <Menu id="simple-menu" anchorEl={rightMenu} open={Boolean(rightMenu)} onClose={this.handleRightClose}>
            <UserInfo />
            <MenuItem>My account</MenuItem>
            <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      )
    } else {
      viewableNavBar = (
        <Toolbar>
          <Typography variant="h4" color="inherit">
            Smooffee
          </Typography>
        </Toolbar>
      )
    }
    return <AppBar position="static">{viewableNavBar}</AppBar>
  }
}

Navbar.propTypes = {
  loggedin: PropTypes.bool.isRequired
}

export default Navbar
