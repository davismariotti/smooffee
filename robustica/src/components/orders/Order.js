import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'

export default class Order extends Component {
  constructor(props) {
    super(props)
    this.state = {
      item: props.item,
      user: props.user,
      location: props.location
    }
    // TODO create fullfil and edit buttons(need to bind them to DB)
    this.fulfill = this.fulfill.bind(this);
    this.edit = this.edit.bind(this);
  }

  fulfill() {
    // TODO tie user who fulfills order to reciept
  }

  edit() {
    // TODO add edit order options
  }

  render() {
    const {item, user, location} = this.state
    return (
      <div>
        {item}
        {user}
        {location}
        <Button onClick={this.edit}>Edit</Button>
        <Button onClick={this.fulfill}>Fulfill</Button>
      </div>
    )
  }
}

Order.propTypes = {
  item: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired
}