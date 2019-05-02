import React, { Component } from 'react'
import { Button, Checkbox, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core'
import { compose } from 'redux'
import { withStyles } from '@material-ui/core/styles'
import MoreVert from '@material-ui/icons/Menu'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import * as PropTypes from 'prop-types'

import { AlignCenter } from '../../styles/core'
import OrganizationSettingsActions from '../actions'
import AreYouSureModal from '../../util/AreYouSureModal'
import { editOrderModifierStatusMutation, listOrderModifiersQuery } from '../../../graphql/orderModifierQueries'
import { StorageService } from '../../../services/StorageService'
import Status from '../../../utils/Status'
import EditOrderModifierModal from '../modals/EditOrderModifierModal'


const styles = {
  tableRowDisabled: {
    color: '#B0B0B0'
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openCreateOrderModifierModal: () => dispatch(OrganizationSettingsActions.openCreateOrderModifierModal()),
    openEditOrderModifierModal: (orderModifier) => dispatch(OrganizationSettingsActions.openEditOrderModifierModal(orderModifier)),
    openOrderModifierMenu: (row) => dispatch(OrganizationSettingsActions.openOrderModifierMenu(row)),
    closeOrderModifierMenu: () => dispatch(OrganizationSettingsActions.closeOrderModifierMenu()),
    openAreYouSure: (onSubmit) => dispatch(OrganizationSettingsActions.openAreYouSureModal('Are You Sure?', onSubmit)),
    closeAreYouSure: () => dispatch(OrganizationSettingsActions.closeAreYouSureModal())
  }
}

class OrderModifierList extends Component {
  constructor(props) {
    super(props)
    this.renderTable = this.renderTable.bind(this)
  }

  renderTable() {
    const {
      classes,
      openOrderModifierMenu,
      listOrderModifiersQueryResult,
      editOrderModifierStatusMutate
    } = this.props
    return (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="right">Available?</TableCell>
            <TableCell align="right">Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(() => {
            if (listOrderModifiersQueryResult.orderModifier == null) return (
              <TableRow>
                <TableCell>Loading</TableCell>
              </TableRow>
            )
            if (listOrderModifiersQueryResult.error) return (
              <TableRow>
                <TableCell>Error</TableCell>
              </TableRow>
            )
            return listOrderModifiersQueryResult.orderModifier.list.map(orderModifierItem => {
              return (
                <TableRow key={orderModifierItem.id} className={orderModifierItem.status !== Status.ACTIVE ? classes.tableRowDisabled : null}>
                  <TableCell align="left" className={orderModifierItem.status !== Status.ACTIVE ? classes.tableRowDisabled : null}>
                    {orderModifierItem.name}
                  </TableCell>
                  <TableCell align="right">
                    <Checkbox checked={orderModifierItem.status === Status.ACTIVE} onChange={() => {
                      editOrderModifierStatusMutate({
                        variables: {
                          orderModifierId: orderModifierItem.id,
                          status: orderModifierItem.status === Status.ACTIVE ? Status.NOT_AVAILABLE : Status.ACTIVE
                        }
                      }).then(listOrderModifiersQueryResult.refetch)
                    }}/>
                  </TableCell>
                  <TableCell align="right">
                    <Button onClick={(e) => {
                      openOrderModifierMenu({
                        anchorEl: e.target,
                        orderModifierItem
                      })
                    }}>
                      <MoreVert/>
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })
          })()}
        </TableBody>
      </Table>
    )
  }


  render() {
    const {
      openCreateOrderModifierModal,
      closeOrderModifierMenu,
      openEditOrderModifierModal,
      orderModifierMenu,
      openAreYouSure,
      listOrderModifiersQueryResult,
      areYouSure,
      closeAreYouSure,
      editOrderModifierStatusMutate
    } = this.props

    return (
      <div>
        <EditOrderModifierModal onSubmit={listOrderModifiersQueryResult.refetch}/>
        <AreYouSureModal open={!!areYouSure} message="Are you sure?" onClose={closeAreYouSure} onSubmit={(areYouSure && areYouSure.onSubmit) || null}/>
        <Menu id="menu" open={!!orderModifierMenu} anchorEl={(orderModifierMenu && orderModifierMenu.anchorEl) || null} onClose={closeOrderModifierMenu}>
          <MenuItem>
            <Button onClick={() => {
              openEditOrderModifierModal(orderModifierMenu.orderModifierItem)
            }}>Edit</Button>
          </MenuItem>
          <MenuItem>
            <Button onClick={() => {
              openAreYouSure(() => {
                editOrderModifierStatusMutate({
                  variables: {
                    orderModifierId: orderModifierMenu.orderModifierItem.id,
                    status: Status.DELETED
                  }
                }).then(() => {
                  listOrderModifiersQueryResult.refetch()
                })
              })
            }} style={{ color: '#E83323' }}>Delete</Button>
          </MenuItem>
        </Menu>
        <Paper className="paper" elevation={1}>
          <AlignCenter>
            <Typography variant="h5" component="h3">
              Order Modifiers
            </Typography>
            <Button onClick={openCreateOrderModifierModal}>Create Order Modifier</Button>
          </AlignCenter>
          <div>
            {this.renderTable()}
          </div>
        </Paper>
      </div>
    )
  }
}

OrderModifierList.propTypes = {
  classes: PropTypes.object.isRequired,
  listOrderModifiersQueryResult: PropTypes.object.isRequired,

  openCreateOrderModifierModal: PropTypes.func.isRequired,
  openEditOrderModifierModal: PropTypes.func.isRequired,

  openOrderModifierMenu: PropTypes.func.isRequired,
  closeOrderModifierMenu: PropTypes.func.isRequired,

  areYouSure: PropTypes.object,
  openAreYouSure: PropTypes.func.isRequired,
  closeAreYouSure: PropTypes.func.isRequired,

  orderModifierMenu: PropTypes.object,
  editOrderModifierStatusMutate: PropTypes.func.isRequired
}

OrderModifierList.defaultProps = {
  orderModifierMenu: null
}

const mapStateToProps = ({ organizationSettings }) => {
  return {
    orderModifierMenu: organizationSettings.orderModifierMenu,
    areYouSure: organizationSettings.areYouSure
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  graphql(listOrderModifiersQuery, {
    name: 'listOrderModifiersQueryResult',
    options: {
      variables: {
        organizationId: StorageService.getOrganizationId(),
        parameters: {
          order: [
            'name',
            'asc'
          ],
          filter: {
            not: {
              eq: {
                field: 'status',
                value: Status.DELETED
              }
            }
          }
        }
      }
    }
  }),
  graphql(editOrderModifierStatusMutation, {
    name: 'editOrderModifierStatusMutate'
  }),
)(OrderModifierList)
