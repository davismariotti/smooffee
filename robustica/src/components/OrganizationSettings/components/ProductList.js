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
import { editProductStatusMutation, listProductsQuery } from '../../../graphql/productQueries'
import { ORGANIZATION_ID } from '../../../constants'
import AreYouSureModal from '../../util/AreYouSureModal'
import EditProductModal from '../EditProductModal'

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

class ProductList extends Component {
  render() {
    const {classes,
      openCreateProductModal,
      openMoreVertMenu,
      openEditProductModal,
      openMenu,
      openAreYouSure,
      editProductStatusMutate,
      listProductsQueryResult,
      areYouSure,
      closeAreYouSure,
      closeMoreVertMenu
    } = this.props
    return (
      <div>
        <EditProductModal onSubmit={listProductsQueryResult.refetch}/>
        <AreYouSureModal open={!!areYouSure} message="Are you sure?" onClose={closeAreYouSure} onSubmit={areYouSure && areYouSure.onSubmit || null}/>
        <Menu id="menu" open={openMenu != null} anchorEl={(openMenu && openMenu.anchorEl) || null} onClose={closeMoreVertMenu}>
          <MenuItem>
            <Button onClick={() => {
              openEditProductModal(openMenu.productItem)
            }}>Edit</Button>
          </MenuItem>
          <MenuItem>
            <Button onClick={() => {
              openAreYouSure(() => {
                editProductStatusMutate({
                  variables: {
                    productId: openMenu.productItem.id,
                    status: -2
                  }
                })
                listProductsQueryResult.refetch()
              })
            }} style={{color: '#E83323'}}>Delete</Button>
          </MenuItem>
        </Menu>
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

ProductList.propTypes = {
  classes: PropTypes.object.isRequired,
  listProductsQueryResult: PropTypes.object.isRequired,
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

ProductList.defaultProps = {
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
    options: {
      variables: {
        organizationId: localStorage.getItem(ORGANIZATION_ID),
        parameters: {
          order: [
            'name',
            'asc'
          ]
        }
      }
    }
  }),
  graphql(editProductStatusMutation, {
    name: 'editProductStatusMutate'
  }),
)
(ProductList)