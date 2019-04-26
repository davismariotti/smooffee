import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core'
import { compose } from 'redux'
import MoreVert from '@material-ui/icons/Menu'
import Loader from 'react-loaders'
import { graphql } from 'react-apollo'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { AlignCenter, CenterDiv } from '../styles/core'
import { readUserQueryExpanded } from '../../graphql/userQueries'
import UserPageActions from './actions'

class UserPage extends Component {
  constructor(props) {
    super(props)
    this.renderOrdersTable = this.renderOrdersTable.bind(this)
    this.renderPaymentsTable = this.renderPaymentsTable.bind(this)
  }

  renderOrdersTable(orders) {

    const {openOrderHistoryMenu} = this.props

    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left">Date</TableCell>
            <TableCell align="right">Product</TableCell>
            <TableCell align="right">Cost</TableCell>
            <TableCell align="right">Delivery Period</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map(order => {
            return (
              <TableRow key={order.id}>
                <TableCell align="left">2-19-2019</TableCell>
                <TableCell align="right">{order.product.name}</TableCell>
                <TableCell align="right">{`$${(order.product.price / 100).toFixed(2)}`}</TableCell>
                <TableCell align="right">{order.deliveryPeriod.classPeriod}</TableCell>
                <TableCell align="right">{order.location}</TableCell>
                <TableCell align="right">{order.status}</TableCell>
                <TableCell align="right">
                  <Button onClick={(e) => {
                    openOrderHistoryMenu(order, e.target)
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

  renderPaymentsTable(payments) {
    const {openPaymentHistoryMenu} = this.props
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left">Date</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payments.map(payment => {
            return (
              <TableRow key={payment.id}>
                <TableCell align="left">2-19-2019</TableCell>
                <TableCell align="right">{`$${(payment.amount / 100).toFixed(2)}`}</TableCell>
                <TableCell align="right">{payment.type.charAt(0).toUpperCase() + payment.type.slice(1)}</TableCell>
                <TableCell align="right">
                  <Button onClick={(e) => {
                    openPaymentHistoryMenu(payment, e.target)
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
    const {
      readUserQueryExpandedResult,
      changeTab,
      selectedTab,
      paymentHistoryMenu,
      orderHistoryMenu,
      closeOrderPaymentHistoryMenu
    } = this.props

    if (readUserQueryExpandedResult.loading) return (
      <CenterDiv>
        <Loader type="line-scale" active color="black"/>
      </CenterDiv>
    )
    if (readUserQueryExpandedResult.error) return <div>Error</div>

    const readUser = readUserQueryExpandedResult.user.read

    const menuIsOpen = !!paymentHistoryMenu || !!orderHistoryMenu
    const anchorEl = (paymentHistoryMenu) ? paymentHistoryMenu.anchorEl : ((orderHistoryMenu) ? orderHistoryMenu.anchorEl : null)


    return (
      <div>

        <Menu id="menu" open={menuIsOpen} anchorEl={anchorEl} onClose={closeOrderPaymentHistoryMenu}>
          {orderHistoryMenu && (
            <MenuItem>
              <Button onClick={() => {

              }}>Refund Order</Button>
            </MenuItem>
          )}
          {paymentHistoryMenu && (
            <MenuItem>
              <Button onClick={() => {

              }}>Refund Payment</Button>
            </MenuItem>
          )}
        </Menu>

        <Paper className="paper" elevation={1}>
          <AlignCenter>
            <Typography style={{margin: '10px'}} variant="h5" component="h3">
              {`${readUser.firstName} ${readUser.lastName}`}
            </Typography>
            {readUser.email}
            <br/>
            Balance: {`$${(readUser.balance / 100).toFixed(2)}`}
          </AlignCenter>
        </Paper>
        <Paper className="paper" elevation={1}>
          <Tabs value={selectedTab} indicatorColor="primary" textColor="primary" onChange={(event, value) => {
            event.preventDefault()
            changeTab(value)
          }}>
            <Tab label="Order History"/>
            <Tab label="Payment History"/>
          </Tabs>
          {selectedTab === 0 && this.renderOrdersTable(readUser.orders)}
          {selectedTab === 1 && this.renderPaymentsTable(readUser.payments)}
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = ({userpage}) => {
  return {
    selectedTab: userpage.selectedTab,
    paymentHistoryMenu: userpage.paymentHistoryMenu,
    orderHistoryMenu: userpage.orderHistoryMenu
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeTab: (selectedTab) => dispatch(UserPageActions.changeTab(selectedTab)),
    openOrderHistoryMenu: (order, anchorEl) => dispatch(UserPageActions.openOrderHistoryMenu(order, anchorEl)),
    closeOrderPaymentHistoryMenu: () => dispatch(UserPageActions.closeOrderPaymentHistoryMenu()),
    openPaymentHistoryMenu: (payment, anchorEl) => dispatch(UserPageActions.openPaymentHistoryMenu(payment, anchorEl))
  }
}

export default compose(
  graphql(readUserQueryExpanded, {
    name: 'readUserQueryExpandedResult',
    options: ownProps => {
      return {
        variables: {
          userId: ownProps.match.params.id
        }
      }
    }
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(UserPage)
