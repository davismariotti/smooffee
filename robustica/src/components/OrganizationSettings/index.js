import React, { Component } from 'react'
import OrganizationName from './components/OrganizationName'
import ProductList from './components/ProductList'
import UserList from './components/UserList'
import OrganizationDetails from './components/OrganizationDetails'
import DeliveryPeriodList from './components/DeliveryPeriodList'
import OrderModifierList from './components/OrderModifierList'

class OrganizationSettings extends Component {
  render() {
    return (
      <div>
        <OrganizationName/>
        <OrganizationDetails/>
        <DeliveryPeriodList/>
        <ProductList/>
        <OrderModifierList/>
        <UserList/>
      </div>
    )
  }
}

export default OrganizationSettings