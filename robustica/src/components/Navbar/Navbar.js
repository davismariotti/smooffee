import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { AppBar, IconButton, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import Face from '@material-ui/icons/Face'
import { AuthService } from '../../services/AuthService'
import '../../css/index.css'
import NavbarActions from './actions'
import { ADMIN, SUPERVISOR } from '../../utils/role'
import { AlignCenter } from '../styles/core'

class Navbar extends Component {
  handleLogout = () => {
    AuthService.signout()
  }

  render() {
    const {
      leftMenuOpen,
      rightMenuOpen,
      openLeftMenu,
      closeLeftMenu,
      openRightMenu,
      closeRightMenu
    } = this.props

    return <AppBar position="static">
      {AuthService.isSignedIn() ?
        <Toolbar className="navBar">
          <IconButton color="inherit" buttonRef={node => {
            this.leftMenuEl = node
          }} onClick={openLeftMenu}>
            <MenuIcon/>
          </IconButton>
          <Menu id="simple-menu" anchorEl={this.leftMenuEl} open={leftMenuOpen} onClose={closeLeftMenu}>
            <MenuItem>
              <Link to="/home">Home</Link>
            </MenuItem>
            {
              AuthService.userInRoles([SUPERVISOR, ADMIN]) &&
              <MenuItem>
                <Link to="/settings">Organization Settings</Link>
              </MenuItem>
            }
          </Menu>
          <AlignCenter>
            <Typography variant="h4" color="inherit">
              Smooffee
            </Typography>
          </AlignCenter>
          <IconButton align="right" color="inherit" buttonRef={node => {
            this.rightMenuEl = node
          }} onClick={openRightMenu}>
            <Face/>
          </IconButton>
          <Menu id="simple-menu" anchorEl={this.rightMenuEl} open={rightMenuOpen} onClose={closeRightMenu}>
            <MenuItem>My account</MenuItem>
            <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
        : <Toolbar className="navBar">
          <Typography variant="h4" color="inherit">
            Smooffee
          </Typography>
        </Toolbar>
      }
    </AppBar>
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openLeftMenu: () => dispatch(NavbarActions.openLeftMenu()),
    closeLeftMenu: () => dispatch(NavbarActions.closeLeftMenu()),
    openRightMenu: () => dispatch(NavbarActions.openRightMenu()),
    closeRightMenu: () => dispatch(NavbarActions.closeRightMenu())
  }
}

const mapStateToProps = ({navbar}) => {
  return {
    leftMenuOpen: navbar.leftMenuOpen,
    rightMenuOpen: navbar.rightMenuOpen
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
