import React, { Component } from 'react'
import * as PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { compose, graphql } from 'react-apollo'
import MoreVert from '@material-ui/icons/Menu'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { Checkbox, TableBody, Typography } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { ORGANIZATION_ID } from '../../constants'
import { editProductStatusMutation, listProductsQuery } from '../../graphql/productQueries'
import EditProductModal from './EditProductModal'
import OrganizationSettingsActions from './actions'
import { AlignCenter, AlignRight} from '../styles/core'
import AreYouSureModal from '../util/AreYouSureModal'

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

const mapDispatchToProps = (dispatch) => {
  return {
    openCreateProductModal: () => dispatch(OrganizationSettingsActions.openCreateProductModal()),
    closeCreateProductModal: () => dispatch(OrganizationSettingsActions.closeCreateProductModal()),
    openEditProductModal: (product) => dispatch(OrganizationSettingsActions.openEditProductModal(product)),
    openMoreVertMenu: (row) => dispatch(OrganizationSettingsActions.openMoreVertMenu(row)),
    closeMoreVertMenu: () => dispatch(OrganizationSettingsActions.closeMoreVertMenu()),
    openAreYouSure: (onSubmit) => dispatch(OrganizationSettingsActions.openAreYouSureModal('Are You Sure?', onSubmit)),
    closeAreYouSure: () => dispatch(OrganizationSettingsActions.closeAreYouSureModal())
  }
}

class Index extends Component {
  render() {
    const {
      classes,
      listProductsQueryResult,
      openEditProductModal,
      openCreateProductModal,
      openMenu,
      openMoreVertMenu,
      closeMoreVertMenu,
      areYouSure,
      openAreYouSure,
      closeAreYouSure,
      editProductStatusMutate
    } = this.props

    return (
      <div>
        <Menu id="menu" open={openMenu != null} anchorEl={(openMenu && openMenu.anchorEl) || null} onClose={closeMoreVertMenu}>
          <MenuItem>
            <Button onClick={() => {
              openEditProductModal(openMenu.productItem)
            }}>Edit</Button>
          </MenuItem>
        </Menu>
        <AreYouSureModal open={!!areYouSure} message="Are you sure?" onClose={closeAreYouSure} onSubmit={areYouSure && areYouSure.onSubmit || null}/>
        <EditProductModal onSubmit={listProductsQueryResult.refetch}/>
        <Paper className={classes.paper} elevation={1}>
          Organization Name
        </Paper>
        <Paper className={classes.paper} elevation={1}>
          <AlignCenter>
            <Typography variant="h5" component="h3">
              Products
            </Typography>
            <Button onClick={openCreateProductModal}>Create Product</Button>
          </AlignCenter>
          <div>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Description</TableCell>
                  <TableCell align="right">Available?</TableCell>
                  <TableCell align="right">Options</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(() => {
                  if (listProductsQueryResult.product == null) return (
                    <TableRow>
                      <TableCell>Loading</TableCell>
                    </TableRow>
                  )
                  if (listProductsQueryResult.error) return (
                    <TableRow>
                      <TableCell>Error</TableCell>
                    </TableRow>
                  )
                  return listProductsQueryResult.product.list.map(productItem => {
                    return (
                      <TableRow key={productItem.id} className={productItem.status !== 1 ? classes.tableRowDisabled : null}>
                        <TableCell align="left" className={productItem.status !== 1 ? classes.tableRowDisabled : null}>
                          {productItem.name}
                        </TableCell>
                        <TableCell align="right" className={productItem.status !== 1 ? classes.tableRowDisabled : null}>
                          {`$${(productItem.price / 100).toFixed(2)}`}
                        </TableCell>
                        <TableCell align="right" className={productItem.status !== 1 ? classes.tableRowDisabled : null}>
                          {productItem.description}
                        </TableCell>
                        <TableCell>
                          <AlignRight>
                            <Checkbox checked={productItem.status === 1} onChange={() => {
                              editProductStatusMutate({
                                variables: {
                                  productId: productItem.id,
                                  status: productItem.status === 1 ? -3 : 1
                                }
                              }).then(listProductsQueryResult.refetch)
                            }}/>
                          </AlignRight>
                        </TableCell>
                        <TableCell align="right">
                          <Button onClick={(e) => {
                            openMoreVertMenu({
                              anchorEl: e.target,
                              productItem
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

Index.propTypes = {
  classes: PropTypes.object.isRequired,
  listProductsQueryResult: PropTypes.object,
  openCreateProductModal: PropTypes.func.isRequired,
  openEditProductModal: PropTypes.func.isRequired,
  closeCreateProductModal: PropTypes.func.isRequired,
  openMoreVertMenu: PropTypes.func.isRequired,
  closeMoreVertMenu: PropTypes.func.isRequired,
  openAreYouSure: PropTypes.func.isRequired,
  closeAreYouSure: PropTypes.func.isRequired,
  openMenu: PropTypes.object,
  areYouSure: PropTypes.object,
  editProductStatusMutate: PropTypes.func.isRequired
}

Index.defaultProps = {
  listProductsQueryResult: {},
  openMenu: null
}

const mapStateToProps = ({organizationSettings}) => {
  return {
    openMenu: organizationSettings.openMenu,
    areYouSure: organizationSettings.areYouSure
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  graphql(listProductsQuery, {
    name: 'listProductsQueryResult',
    options: () => {
      return {
        variables: {
          organizationId: localStorage.getItem(ORGANIZATION_ID)
        }
      }
    }
  }),
  graphql(editProductStatusMutation, {
    name: 'editProductStatusMutate'
  }),
)(Index)
