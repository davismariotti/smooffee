import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core'
import * as PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import MoreVert from '@material-ui/icons/Menu'

import { AlignCenter } from '../../styles/core'
import { listUsersQuery } from '../../../graphql/userQueries'
import OrganizationSettingsActions from '../actions'
import AddFundsModal from '../modals/AddFundsModal'
import { StorageService } from '../../../services/StorageService'
import { translateRole } from '../../../utils/role'
import history from '../../../utils/history'

class UserList extends Component {
  constructor(props) {
    super(props)
    this.renderTable = this.renderTable.bind(this)
  }

  renderTable() {
    const { listUsersQueryResult, openUserMenu } = this.props
    if (listUsersQueryResult.loading) {
      return <div>Loading</div>
    } else if (listUsersQueryResult.error) {
      return <div>Error</div>
    }
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left">First Name</TableCell>
            <TableCell align="left">Last Name</TableCell>
            <TableCell align="right">Balance</TableCell>
            <TableCell align="right">Role</TableCell>
            <TableCell align="right">Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listUsersQueryResult.user.list.map(userItem => {
            return (
              <TableRow key={userItem.id}>
                <TableCell align="left">{userItem.firstName}</TableCell>
                <TableCell align="left">{userItem.lastName}</TableCell>
                <TableCell align="right">{`$${(userItem.balance / 100).toFixed(2)}`}</TableCell>
                <TableCell align="right">{translateRole(userItem.role)}</TableCell>
                <TableCell align="right">
                  <Button onClick={(e) => {
                    openUserMenu({
                      anchorEl: e.target,
                      userItem
                    })
                  }}>
                    <MoreVert/>
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    )
  }

  render() {
    const { userMenu, closeUserMenu, openAddMoreFunds, listUsersQueryResult } = this.props

    return (
      <div>
        <AddFundsModal onSubmit={listUsersQueryResult.refetch}/>
        <Menu id="menu" open={!!userMenu} anchorEl={(userMenu && userMenu.anchorEl) || null} onClose={closeUserMenu}>
          <MenuItem>
            <Button onClick={() => {
              openAddMoreFunds(userMenu.userItem)
            }}>Add Funds</Button>
          </MenuItem>
          <MenuItem>
            <Button onClick={() => {
              history.push(`/userinfo/${userMenu.userItem.id}`)
            }}>More Information</Button>
          </MenuItem>
        </Menu>
        <Paper className="paper" elevation={1}>
          <AlignCenter>
            <Typography variant="h5" component="h3">
              User List
            </Typography>
          </AlignCenter>
          <div>
            {this.renderTable()}
          </div>
        </Paper>
      </div>
    )
  }
}

UserList.propTypes = {
  listUsersQueryResult: PropTypes.object.isRequired,
  addMoreFunds: PropTypes.object,
  userMenu: PropTypes.object,
  closeUserMenu: PropTypes.func.isRequired,
  openUserMenu: PropTypes.func.isRequired,
  openAddMoreFunds: PropTypes.func.isRequired,
  closeAddMoreFunds: PropTypes.func.isRequired
}

const mapStateToProps = ({ organizationSettings }) => {
  return {
    addMoreFunds: organizationSettings.addMoreFunds,
    userMenu: organizationSettings.userMenu
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeUserMenu: () => dispatch(OrganizationSettingsActions.closeUserMenu()),
    openUserMenu: (row) => dispatch(OrganizationSettingsActions.openUserMenu(row)),
    openAddMoreFunds: (user) => dispatch(OrganizationSettingsActions.openAddMoreFundsModal(user)),
    closeAddMoreFunds: () => dispatch(OrganizationSettingsActions.closeAddFundsModal())
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(listUsersQuery, {
    name: 'listUsersQueryResult',
    options: {
      variables: {
        organizationId: StorageService.getOrganizationId(),
        parameters: {
          order: [
            'lastName',
            'asc'
          ]
        }
      }
    }
  })
)(UserList)
