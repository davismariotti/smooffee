import React, {Component} from 'react'
import * as PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {gql} from 'apollo-boost'
import {Query} from 'react-apollo'
import MoreVert from '@material-ui/icons/Menu'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import {TableBody, Typography} from '@material-ui/core'
import {ORGANIZATION_ID} from '../../constants'

const styles = {
  organizationSettings: {
    textAlign: 'center'
  }
}

const ListProductsQuery = gql`
  query ListProducts($organizationId: Long!) {
    product {
      list(organizationId: $organizationId) {
        id
        price
        description
        name
      }
    }
  }
`

class OrganizationSettings extends Component {
  render() {
    const {classes} = this.props
    return (
      <div className={classes.organizationSettings}>
        <Typography>
          Products
        </Typography>
        <Query query={ListProductsQuery} variables={{organizationId: localStorage.getItem(ORGANIZATION_ID)}}>
          {({loading, error, data}) => {
            if (loading) return 'Loading'
            if (error) return 'Error'
            return (
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
                    {data.product.list.map(productItem => {
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
                            <MoreVert/>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            )
          }}
        </Query>
      </div>
    )
  }
}

OrganizationSettings.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(OrganizationSettings)
