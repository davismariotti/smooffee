import React, { Component } from 'react'
import OrganizationName from './components/OrganizationName'
import ProductList from './components/ProductList'
import UserList from './components/UserList'
import OrganizationDetails from './components/OrganizationDetails'
import DeliveryPeriodList from './components/DeliveryPeriodList'

class OrganizationSettings extends Component {
  render() {
    return (
      <div>
        <OrganizationName/>
        <OrganizationDetails/>
        <DeliveryPeriodList/>
        <ProductList/>
        <UserList/>
      </div>
    )
  }
}

export default OrganizationSettings