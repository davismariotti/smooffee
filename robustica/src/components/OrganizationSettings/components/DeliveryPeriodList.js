import React, { Component } from 'react'
import { Checkbox, TableBody, Typography, Table, TableCell, TableHead, TableRow, Paper, Menu, MenuItem, Button } from '@material-ui/core'
import { compose } from 'redux'
import { withStyles } from '@material-ui/core/styles'
import MoreVert from '@material-ui/icons/Menu'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import * as PropTypes from 'prop-types'

import { AlignCenter, AlignRight } from '../../styles/core'
import OrganizationSettingsActions from '../actions'
import { ORGANIZATION_ID } from '../../../constants'
import AreYouSureModal from '../../util/AreYouSureModal'
import EditDeliveryPeriodModal from '../modals/EditDeliveryPeriodModal'
import { editDeliveryPeriodStatusMutation, listDeliveryPeriodsQuery } from '../../../graphql/deliveryPeriodQueries'

const styles = {
  organizationSettings: {
    textAlign: 'center'
  },
  paper: {
    margin: '30px',
    padding: '10px'
  },
  tableRowDisabled: {
    color: '#B0B0B0'
  }
}

const daysOfTheWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

const mapDispatchToProps = (dispatch) => {
  return {
    openCreateDeliveryPeriodModal: () => dispatch(OrganizationSettingsActions.openCreateDeliveryPeriodModal()),
    openEditDeliveryPeriodModal: (deliveryPeriod) => dispatch(OrganizationSettingsActions.openEditDeliveryPeriodModal(deliveryPeriod)),
    openDeliveryPeriodMenu: (row) => dispatch(OrganizationSettingsActions.openDeliveryPeriodMenu(row)),
    closeDeliveryPeriodMenu: () => dispatch(OrganizationSettingsActions.closeDeliveryPeriodMenu()),
    openAreYouSure: (onSubmit) => dispatch(OrganizationSettingsActions.openAreYouSureModal('Are You Sure?', onSubmit)),
    closeAreYouSure: () => dispatch(OrganizationSettingsActions.closeAreYouSureModal())
  }
}

class DeliveryPeriodList extends Component {
  render() {
    const {classes,
      openCreateDeliveryPeriodModal,
      openDeliveryPeriodMenu,
      closeDeliveryPeriodMenu,
      openEditDeliveryPeriodModal,
      deliveryPeriodMenu,
      openAreYouSure,
      listDeliveryPeriodsQueryResult,
      areYouSure,
      closeAreYouSure,
      editDeliveryPeriodStatusMutate
    } = this.props
    return (
      <div>
        <EditDeliveryPeriodModal onSubmit={listDeliveryPeriodsQueryResult.refetch}/>
        <AreYouSureModal open={!!areYouSure} message="Are you sure?" onClose={closeAreYouSure} onSubmit={areYouSure && areYouSure.onSubmit || null}/>
        <Menu id="menu" open={!!deliveryPeriodMenu} anchorEl={(deliveryPeriodMenu && deliveryPeriodMenu.anchorEl) || null} onClose={closeDeliveryPeriodMenu}>
          <MenuItem>
            <Button onClick={() => {
              openEditDeliveryPeriodModal(deliveryPeriodMenu.deliveryPeriodItem)
            }}>Edit</Button>
          </MenuItem>
          <MenuItem>
            <Button onClick={() => {
              openAreYouSure(() => {
                editDeliveryPeriodStatusMutate({
                  variables: {
                    deliveryPeriodId: deliveryPeriodMenu.deliveryPeriodItem.id,
                    status: -2
                  }
                }).then(() => {
                  listDeliveryPeriodsQueryResult.refetch()
                })
              })
            }} style={{color: '#E83323'}}>Delete</Button>
          </MenuItem>
        </Menu>
        <Paper className={classes.paper} elevation={1}>
          <AlignCenter>
            <Typography variant="h5" component="h3">
              Delivery Periods
            </Typography>
            <Button onClick={openCreateDeliveryPeriodModal}>Create Delivery Period</Button>
          </AlignCenter>
          <div>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Name</TableCell>
                  {daysOfTheWeek.map(day => {
                    return <TableCell align="right">{day}</TableCell>
                  })}
                  <TableCell align="right">Available?</TableCell>
                  <TableCell align="right">Options</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(() => {
                  if (listDeliveryPeriodsQueryResult.deliveryPeriod == null) return (
                    <TableRow>
                      <TableCell>Loading</TableCell>
                    </TableRow>
                  )
                  if (listDeliveryPeriodsQueryResult.error) return (
                    <TableRow>
                      <TableCell>Error</TableCell>
                    </TableRow>
                  )
                  return listDeliveryPeriodsQueryResult.deliveryPeriod.list.map(deliveryPeriodItem => {
                    return (
                      <TableRow key={deliveryPeriodItem.id} className={deliveryPeriodItem.status !== 1 ? classes.tableRowDisabled : null}>
                        <TableCell align="left" className={deliveryPeriodItem.status !== 1 ? classes.tableRowDisabled : null}>
                          {deliveryPeriodItem.classPeriod}
                        </TableCell>
                        {daysOfTheWeek.map(day => {
                          return <TableCell align="right" className={deliveryPeriodItem.status !== 1 ? classes.tableRowDisabled : null}>{deliveryPeriodItem[day.toLowerCase()]}</TableCell>
                        })}
                        <TableCell>
                          <AlignRight>
                            <Checkbox checked={deliveryPeriodItem.status === 1} onChange={() => {
                              editDeliveryPeriodStatusMutate({
                                variables: {
                                  deliveryPeriodId: deliveryPeriodItem.id,
                                  status: deliveryPeriodItem.status === 1 ? -3 : 1
                                }
                              }).then(listDeliveryPeriodsQueryResult.refetch)
                            }}/>
                          </AlignRight>
                        </TableCell>
                        <TableCell align="right">
                          <Button onClick={(e) => {
                            openDeliveryPeriodMenu({
                              anchorEl: e.target,
                              deliveryPeriodItem
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
          </div>
        </Paper>
      </div>
    )
  }
}

DeliveryPeriodList.propTypes = {
  classes: PropTypes.object.isRequired,
  listDeliveryPeriodsQueryResult: PropTypes.object.isRequired,

  openCreateDeliveryPeriodModal: PropTypes.func.isRequired,
  openEditDeliveryPeriodModal: PropTypes.func.isRequired,

  openDeliveryPeriodMenu: PropTypes.func.isRequired,
  closeDeliveryPeriodMenu: PropTypes.func.isRequired,

  areYouSure: PropTypes.object,
  openAreYouSure: PropTypes.func.isRequired,
  closeAreYouSure: PropTypes.func.isRequired,

  deliveryPeriodMenu: PropTypes.object,
  editDeliveryPeriodStatusMutate: PropTypes.func.isRequired
}

DeliveryPeriodList.defaultProps = {
  deliveryPeriodMenu: null
}

const mapStateToProps = ({organizationSettings}) => {
  return {
    deliveryPeriodMenu: organizationSettings.deliveryPeriodMenu,
    areYouSure: organizationSettings.areYouSure
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  graphql(listDeliveryPeriodsQuery, {
    name: 'listDeliveryPeriodsQueryResult',
    options: {
      variables: {
        organizationId: localStorage.getItem(ORGANIZATION_ID),
        parameters: {
          order: [
            'classPeriod',
            'asc'
          ],
          filter: {
            not: {
              eq: {
                field: 'status',
                value: '-2'
              }
            }
          }
        }
      }
    }
  }),
  graphql(editDeliveryPeriodStatusMutation, {
    name: 'editDeliveryPeriodStatusMutate'
  }),
)
(DeliveryPeriodList)