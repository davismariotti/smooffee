import React, { Component } from 'react'
import { Button, GridList, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import * as PropTypes from 'prop-types'
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import Loader from 'react-loaders'
import Order from './orders/Order'
import '../../css/index.css'
import CreateOrderModal from './orders/CreateOrderModal'
import { listOrdersQuery } from '../../graphql/orderQueries'
import HomeActions from './actions'
import { AlignCenter, CenterDiv, MainView } from '../styles/core'
import { StorageService } from '../../services/StorageService'
import { listDeliveryPeriodsQuery } from '../../graphql/deliveryPeriodQueries'
import Status from '../../utils/Status'

const styles = {
  title: {
    marginTop: '10px',
    marginBottom: '10px'
  }
}

class Home extends Component {

  render() {
    const {classes, listOrdersQueryResult, showModal, openModal} = this.props

    if (listOrdersQueryResult.loading) return (
      <CenterDiv>
        <Loader type="line-scale" active color="black"/>
      </CenterDiv>
    )
    if (listOrdersQueryResult.error) return <div>Error</div>

    return (
      <MainView>
        <div className="orderList">
          <div>
            <AlignCenter>
              <CreateOrderModal open={showModal} refetch={listOrdersQueryResult.refetch}/>
              <Typography className={classes.title} variant="h3" color="inherit">
                Current Orders
              </Typography>
              <Button onClick={openModal}>Create Order</Button>
            </AlignCenter>
            <GridList cols={3} padding={10}>
              {listOrdersQueryResult.order.list.map(order => {
                return <Order key={order.id} order={order} refetch={listOrdersQueryResult.refetch}/>
              })}
            </GridList>
          </div>
        </div>
      </MainView>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  listOrdersQueryResult: PropTypes.object,
  showModal: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
}

Home.defaultProps = {
  listOrdersQueryResult: {}
}

const mapStateToProps = state => {
  return {
    showModal: state.home.createOrderModalOpen
  }
}

function mapDispatchToProps(dispatch) {
  return {
    openModal: () => dispatch(HomeActions.openCreateOrderModal())
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  graphql(listOrdersQuery, {
    name: 'listOrdersQueryResult',
    options: {
      variables: {
        organizationId: StorageService.getOrganizationId(),
        parameters: {
          filter: {
            include: {
              field: 'status',
              values: [Status.ACTIVE, Status.IN_PROGRESS]
            }
          }
        }
      }
    }
  }),
  graphql(listDeliveryPeriodsQuery, {
    name: 'listDeliveryPeriodsQueryResult',
    options: {
      variables: {
        organizationId: StorageService.getOrganizationId(),
        parameters: {
          filter: {
            eq: {
              field: 'status',
              value: Status.ACTIVE
            }
          },
          order: [
            'name',
            'asc'
          ]
        }
      }
    }
  })
)(Home)
