import React, { Component } from 'react';

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
        <button onClick={this.edit}>Edit</button>
        <button onClick={this.fulfill}>Fulfill</button>
      </div>
    );
  }
}

export default Order;
