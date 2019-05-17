import React, { Component } from 'react'
import OrganizationName from './components/OrganizationName'
import ProductList from './components/ProductList'
import UserList from './components/UserList'
import OrganizationDetails from './components/OrganizationDetails'
import DeliveryPeriodList from './components/DeliveryPeriodList'
import OrderModifierList from './components/OrderModifierList'
import { AuthService } from '../../services/AuthService'
import { ADMIN } from '../../utils/role'

class OrganizationSettings extends Component {
  render() {
    return (
      <div>
        <OrganizationName/>
        {AuthService.userHasRole(ADMIN) && <OrganizationDetails/>}
        <DeliveryPeriodList/>
        <ProductList/>
        <OrderModifierList/>
        {AuthService.userHasRole(ADMIN) && <UserList/>}
      </div>
    )
  }
}

export default OrganizationSettings