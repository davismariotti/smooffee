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
import Paper from '@material-ui/core/Paper'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import {ORGANIZATION_ID} from '../../constants'


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
const options = [
  'edit',
  'add',
];


const ITEM_HEIGHT = 48;

class OrganizationSettings extends Component {
  constructor(props) {
    super(props)

    this.state = {
      optionMenu: null,
      
    }

    this.classes = props
  }

  handleOptionMenuClick = event => {
    this.setState({ optionMenu: event.currentTarget })
  }

  handleOptionClose = () => {
    this.setState({ optionMenu: null })
  }

  render() {
    const {classes} = this.props;
    const {optionMenu} = this.state;
    const open = Boolean(optionMenu);
    return (
      <div>
        <Paper className={classes.paper} elevation={1}>
        <Typography variant="h5" component="h3">
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
                      let buttonRef

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
                          <Button 
                            aria-owns={optionMenu ? 'menu' : undefined}
                            aria-haspopup="true"
                            onClick={this.handleOptionMenuClick}
                            buttonRef={node=> {buttonRef = node}}>
                            <MoreVert/> 
                          </Button>
                            <Menu
                               id="menu"
                               anchorEl={buttonRef}
                               optionMenu={optionMenu}
                               open={open}
                               onClose={this.handleOptionClose} 
                               PaperProps={{
                                style: {
                                  maxHeight: ITEM_HEIGHT * 2.5,
                                  width: 70,
                                },
                              }}>
                              {options.map(option => (
                              <MenuItem key={option} selected={option === 'Pyxix'} onClick={this.handleOptionClose}>
                                {option}
                              </MenuItem>
                              ))}
                            </Menu>

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
        </Paper>
      </div>
    )
  }
}

OrganizationSettings.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(OrganizationSettings)
