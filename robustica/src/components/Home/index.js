import React, { Component } from 'react'
import { Button, GridList, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import * as PropTypes from 'prop-types'
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import Loader from 'react-loaders'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Paper from '@material-ui/core/Paper'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Order from './orders/Order'
import '../../css/index.css'
import CreateOrderModal from './orders/CreateOrderModal'
import { listOrdersQuery } from '../../graphql/orderQueries'
import HomeActions from './actions'
import { AlignCenter, CenterDiv, MainView } from '../styles/core'
import { StorageService } from '../../services/StorageService'
import { listDeliveryPeriodsQuery } from '../../graphql/deliveryPeriodQueries'
import Status from '../../utils/Status'

const styles = theme => ({
  title: {
    marginTop: '10px',
    marginBottom: '10px'
  },
  dropDown: {
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'absolute',
    width: theme.spacing.unit * 50,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
})

const options = [
  '1',
  '2',
  '3',
  '4',
]

class Home extends Component {
  state = {
    anchorEl: null,
  }

  render() {
    const { anchorEl } = this.state

    const {
      classes,
      listOrdersQueryResult,
      showModal,
      openModal,
      listDeliveryPeriodsQueryResult,
      chooseClassPeriod,
      selectedDeliveryPeriod
    } = this.props

    console.log(this.props)

    if (listOrdersQueryResult.loading || listDeliveryPeriodsQueryResult.loading) return (
      <CenterDiv>
        <Loader type="line-scale" active color="black"/>
      </CenterDiv>
    )
    if (listOrdersQueryResult.error || listDeliveryPeriodsQueryResult.error) return <div>Error</div>

    return (
      <MainView>
        <Paper style={{ float: 'right', maxWidth: '360px' }}>
          <List component="nav">
            <ListItem
              button
              aria-haspopup="true"
              aria-controls="lock-menu"
              aria-label="Choose a Class Period"
              onClick={event => {
                this.setState({ anchorEl: event.currentTarget })
              }}
            >
              <ListItemText
                primary="Choose a Class Period"
                secondary={(selectedDeliveryPeriod && selectedDeliveryPeriod.classPeriod) || 'Please choose one'}
              />
            </ListItem>
          </List>
        </Paper>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => {
            this.setState({ anchorEl: null })
          }}
        >
          {listDeliveryPeriodsQueryResult.deliveryPeriod.list.map(deliveryPeriod => (
            <MenuItem
              key={deliveryPeriod.id}
              selected={!!selectedDeliveryPeriod && deliveryPeriod.id === selectedDeliveryPeriod.id}
              onClick={event => {
                chooseClassPeriod(deliveryPeriod)
                this.setState({ anchorEl: null })
                listOrdersQueryResult.refetch()
              }}
            >
              {deliveryPeriod.classPeriod}
            </MenuItem>
          ))}
        </Menu>
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

const mapStateToProps = ({ home }) => {
  return {
    showModal: home.createOrderModalOpen,
    selectedDeliveryPeriod: home.selectedDeliveryPeriod
  }
}

function mapDispatchToProps(dispatch) {
  return {
    openModal: () => dispatch(HomeActions.openCreateOrderModal()),
    chooseClassPeriod: (deliveryPeriod) => dispatch(HomeActions.chooseClassPeriod(deliveryPeriod))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  graphql(listOrdersQuery, {
    name: 'listOrdersQueryResult',
    options: props => {
      console.log('proprsoposopds', props)
      return {
        notifyOnNetworkStatusChange: true,
        variables: {
          organizationId: StorageService.getOrganizationId(),
          parameters: {
            filter: {
              and: [
                {
                  include: {
                    field: 'status',
                    values: [Status.ACTIVE, Status.IN_PROGRESS]
                  }
                },
                {
                  eq: {
                    field: 'deliveryPeriod.id',
                    value: (props.selectedDeliveryPeriod && String(props.selectedDeliveryPeriod.id) || '0')
                  }
                }
              ]
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
            'classPeriod',
            'asc'
          ]
        }
      }
    }
  })
)(Home)
