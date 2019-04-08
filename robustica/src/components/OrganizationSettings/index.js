import React, { Component } from 'react'
import OrganizationName from './components/OrganizationName'
import ProductList from './components/ProductList'

class OrganizationSettings extends Component {
  render() {
    return (
      <div>
        <OrganizationName/>
        <ProductList/>
      </div>
    )
  }
}
export default OrganizationSettings