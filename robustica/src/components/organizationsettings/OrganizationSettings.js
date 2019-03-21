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
import {ORGANIZATION_ID} from '../../constants'
import {listProductsQuery} from '../../graphql/productQueries'

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

class OrganizationSettings extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: [],
    }

    this.anchorEls = []

    this.classes = props
  }

  handleOptionMenuClick = id => {
    const {open} = this.state
    open[id] = true
    this.setState({
      open
    })
  }

  handleOptionClose = id => {
    const {open} = this.state
    open[id] = false
    this.setState({
      open
    })
  }

  render() {
    const {classes, listProductsQueryResult} = this.props
    const {open} = this.state

    return (
      <div>
        <Paper className={classes.paper} elevation={1}>
          <Typography variant="h5" component="h3">
            Products
          </Typography>
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
                          <Button onClick={() => {
                            this.handleOptionMenuClick(productItem.id)
                          }} buttonRef={node => {
                            this.anchorEls[productItem.id] = node
                          }}>
                            <MoreVert/>
                          </Button>
                          <Menu id="menu" open={open[productItem.id] || false} anchorEl={this.anchorEls[productItem.id]} onClose={() => {
                            this.handleOptionClose(productItem.id)
                          }}>
                            <MenuItem>Edit</MenuItem>
                          </Menu>
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
  listProductsQueryResult: PropTypes.object
}

OrganizationSettings.defaultProps = {
  listProductsQueryResult: {}
}

export default compose(
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
