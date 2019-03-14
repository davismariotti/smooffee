import React, { Component } from 'react'
import MenuItem from '@material-ui/core/MenuItem'

// Options create Menu items and links to pages for users depending on their authorizations

class Options extends Component {
  render() {
    return (
      <div>
        <MenuItem>Add Cash To Accounts</MenuItem>
        <MenuItem>Edit Menu Items</MenuItem>
        <MenuItem>Manage Employees (Admin)</MenuItem>
        <MenuItem>Transaction History (Admin)</MenuItem>
        <MenuItem>Store Analytics (Admin)</MenuItem>
      </div>
    )
  }
}

export default Options
