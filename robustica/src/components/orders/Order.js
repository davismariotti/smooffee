import React, { Component } from 'react';
import Button from '@material-ui/core';

class Order extends Component {
  constructor(props) {
    super(props);
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
    return (
      <div>
        {this.props.item}
        {this.props.user}
        {this.props.location}
        <Button onClick={this.edit}>Edit</Button>
        <Button onClick={this.fulfill}>Fulfill</Button>
      </div>
    );
  }
}

export default Order;
