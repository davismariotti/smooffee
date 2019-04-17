import React, { Component } from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import { Link } from 'react-router-dom'
import { AuthService } from '../services/AuthService'
import { ADMIN, SUPERVISOR } from '../utils/role'

// Options create Menu items and links to pages for users depending on their authorizations

class Options extends Component {
  render() {
    return (
      <div>
        <MenuItem>
          <Link to="/home">Home</Link>
        </MenuItem>
        {
          AuthService.userInRoles([SUPERVISOR, ADMIN]) &&
          <MenuItem>
            <Link to="/settings">Organization Settings</Link>
          </MenuItem>
        }
      </div>
    )
  }
}

export default Options
