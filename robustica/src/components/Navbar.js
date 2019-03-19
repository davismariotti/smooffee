import React, {Component} from 'react'
import * as PropTypes from 'prop-types'
import {AppBar, IconButton, Menu, MenuItem, Toolbar, Typography} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import Face from '@material-ui/icons/Face'
import {AuthService} from '../services/AuthService'
import history from '../utils/history'
import '../css/index.css'
import UserInfo from './UserInfo'
import Options from './options'

class Navbar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      leftMenuShow: false,
      rightMenuShow: false,
    }

    this.classes = props
  }

  handleRightMenuClick = () => {
    this.setState({
      rightMenuShow: true
    })
  }

  handleLeftMenuClick = () => {
    this.setState({
      leftMenuShow: true
    })
  }

  handleLeftClose = () => {
    this.setState({leftMenuShow: false})
  }

  handleRightClose = () => {
    this.setState({rightMenuShow: false})
  }

  handleLogout = () => {
    AuthService.signout()
    this.loggedin = false
    this.setState({
      rightMenuShow: false
    })
    history.push('/login')
  }

  render() {
    const {loggedin} = this.props
    const {leftMenuShow, rightMenuShow} = this.state

    return <AppBar position="static">
      {(() => {
       if (loggedin) {
         return         <Toolbar className="navBar">
           <IconButton color="inherit" buttonRef={node => {this.leftMenuEl = node}} onClick={this.handleLeftMenuClick}>
             <MenuIcon/>
           </IconButton>
           <Menu id="simple-menu" anchorEl={this.leftMenuEl} open={leftMenuShow} onClose={this.handleLeftClose}>
             <Options/>
           </Menu>
           <Typography variant="h4" color="inherit">
             Smooffee
           </Typography>
           <IconButton align="right" color="inherit" buttonRef={node=> {this.rightMenuEl = node}} onClick={this.handleRightMenuClick}>
             <Face/>
           </IconButton>
           <Menu id="simple-menu" anchorEl={this.rightMenuEl} open={rightMenuShow} onClose={this.handleRightClose}>
             <UserInfo/>
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

Navbar.propTypes = {
  loggedin: PropTypes.bool.isRequired
}

export default Navbar
