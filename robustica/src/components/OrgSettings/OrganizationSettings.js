import React, {Component} from 'react'
import * as PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {compose, graphql} from 'react-apollo'
import MoreVert from '@material-ui/icons/Menu'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import {TableBody, Typography} from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import {connect} from 'react-redux'
import {ORGANIZATION_ID} from '../../constants'
import {listProductsQuery} from '../../graphql/productQueries'
import EditProductModal from './EditProductModal'
import OrganizationSettingsActions from './actions'

const styles = {
  organizationSettings: {
    textAlign: 'center'
  },
  paper: {
    marginLeft: '60px',
    marginRight: '60px',
    padding: '10px'
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openCreateProductModal: () => dispatch(OrganizationSettingsActions.openCreateProductModal()),
    closeCreateProductModal: () => dispatch(OrganizationSettingsActions.closeCreateProductModal()),
    openEditProductModal: (product) => dispatch(OrganizationSettingsActions.openEditProductModal(product)),
    openMoreVertMenu: (row) => dispatch(OrganizationSettingsActions.openMoreVertMenu(row)),
    closeMoreVertMenu: () => dispatch(OrganizationSettingsActions.closeMoreVertMenu())
  }
}

class OrganizationSettings extends Component {
  render() {
    const {
      classes,
      listProductsQueryResult,
      openEditProductModal,
      openCreateProductModal,
      openMenu,
      openMoreVertMenu,
      closeMoreVertMenu
    } = this.props

    return (
      <div>
        <Menu id="menu" open={openMenu != null} anchorEl={(openMenu && openMenu.anchorEl) || null} onClose={closeMoreVertMenu}>
          <MenuItem>
            <Button onClick={() => {openEditProductModal(openMenu.productItem)}}>Edit</Button>
          </MenuItem>
        </Menu>
        <EditProductModal/>
        <Paper className={classes.paper} elevation={1}>
          <Typography variant="h5" component="h3">
            Products
          </Typography>
          <Button onClick={openCreateProductModal}>Create Product</Button>
          <div>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Description</TableCell>
                  <TableCell align="right">Options</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(() => {
                  if (listProductsQueryResult.loading) return (
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
                      <TableRow key={productItem.id}>
                        <TableCell align="left">
                          {productItem.name}
                        </TableCell>
                        <TableCell align="right">
                          {`$${productItem.price / 100}`}
                        </TableCell>
                        <TableCell align="right">
                          {productItem.description}
                        </TableCell>
                        <TableCell align="right">
                          <Button onClick={(e) => {
                            openMoreVertMenu({
                            anchorEl: e.target,
                            productItem
                          })}}>
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

OrganizationSettings.propTypes = {
  classes: PropTypes.object.isRequired,
  listProductsQueryResult: PropTypes.object,
  openCreateProductModal: PropTypes.func.isRequired,
  openEditProductModal: PropTypes.func.isRequired,
  closeCreateProductModal: PropTypes.func.isRequired,
  openMoreVertMenu: PropTypes.func.isRequired,
  closeMoreVertMenu: PropTypes.func.isRequired,
  openMenu: PropTypes.object
}

OrganizationSettings.defaultProps = {
  listProductsQueryResult: {},
  openMenu: null
}

const mapStateToProps = ({organizationSettings}) => {
  return {
    openMenu: organizationSettings.openMenu
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
  })
)(OrganizationSettings)
