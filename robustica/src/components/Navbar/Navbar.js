import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AppBar, IconButton, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import Face from '@material-ui/icons/Face'
import { AuthService } from '../../services/AuthService'
import '../../css/index.css'
import Options from '../options'
import NavbarActions from './actions'

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
      {(() => {
        if (AuthService.isSignedIn()) {
          return <Toolbar className="navBar">
            <IconButton color="inherit" buttonRef={node => {
              this.leftMenuEl = node
            }} onClick={openLeftMenu}>
              <MenuIcon/>
            </IconButton>
            <Menu id="simple-menu" anchorEl={this.leftMenuEl} open={leftMenuOpen} onClose={closeLeftMenu}>
              <Options/>
            </Menu>
            <Typography variant="h4" color="inherit">
              Smooffee
            </Typography>
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
        } else {
          return <Toolbar>
            <Typography variant="h4" color="inherit">
              Smooffee
            </Typography>
          </Toolbar>
        }
      })()}
    </AppBar>
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openLeftMenu:   () => dispatch(NavbarActions.openLeftMenu()),
    closeLeftMenu:  () => dispatch(NavbarActions.closeLeftMenu()),
    openRightMenu:  () => dispatch(NavbarActions.openRightMenu()),
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
