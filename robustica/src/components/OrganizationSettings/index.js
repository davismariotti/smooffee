import React, { Component } from 'react'
import OrganizationName from './components/OrganizationName'
import ProductList from './components/ProductList'
import UserList from './components/UserList'

class OrganizationSettings extends Component {
  render() {
    return (
      <div>
        <OrganizationName/>
        <ProductList/>
        <UserList/>
      </div>
    )
  }
}
export default OrganizationSettings