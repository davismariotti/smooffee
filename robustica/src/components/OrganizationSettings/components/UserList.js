import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import * as PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import MoreVert from '@material-ui/icons/Menu'

import { AlignCenter } from '../../styles/core'
import { listUsersQuery } from '../../../graphql/userQueries'
import { ORGANIZATION_ID } from '../../../constants'

const styles = {
  paper: {
    margin: '30px',
    padding: '10px'
  },
}

class UserList extends Component {
  constructor(props) {
    super(props)
    this.renderTable = this.renderTable.bind(this)
  }

  renderTable() {
    const {classes, listUsersQueryResult} = this.props
    if (listUsersQueryResult.loading) {
      return <div>Loading</div>
    } else if (listUsersQueryResult.error) {
      return <div>Error</div>
    }
    console.log('listUsersQueryResult', listUsersQueryResult)
    return (
      <Table className={classes.table}>
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
              <TableRow>
                <TableCell align="left">{userItem.firstName}</TableCell>
                <TableCell align="left">{userItem.lastName}</TableCell>
                <TableCell align="right">{`$${(userItem.balance / 100).toFixed(2)}`}</TableCell>
                <TableCell align="right">{userItem.role}</TableCell>
                <TableCell align="right">
                  <Button>
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
    const {classes} = this.props

    return (
      <div>
        <Paper className={classes.paper} elevation={1}>
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
  classes: PropTypes.object.isRequired,
  listUsersQueryResult: PropTypes.object.isRequired
}

const mapStateToProps = ({organizationSettings}) => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  graphql(listUsersQuery, {
    name: 'listUsersQueryResult',
    options: {
      variables: {
        organizationId: localStorage.getItem(ORGANIZATION_ID),
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
