//Single order item for displaying all data pertaining to one order

import React, { Component } from "react";

class SingleOrder extends Component {
  state = {
    name: "John Doe",
    order: "Carmel Latte",
    price: 4.32,
    date: "1/1/1",
    fullfilled: true
  };

  constructor() {
    super(); //first call constructer of parent class
    this.fullfillOrder = this.fullfillOrder.bind(this); //bind this to fullfillOrder
  }

  fullfillOrder = () => {
    this.setState({ fullfilled: (this.state.fullfilled = false) });
  };

  renderTags() {
    if (this.state.fullfilled === false) return <p>Order fulfilled.</p>;

    return (
      <div>
        Name: {this.state.name} Order: {this.state.order} Total:{" "}
        {this.state.price}$
        <button onClick={this.fullfillOrder}> Fulfilled</button>
      </div>
    );
  }

  render() {
    return <div>{this.renderTags()}</div>;
  }
  formatCount() {
    return this.state.count === 0 ? "Zero" : this.state.count;
  }
}

export default SingleOrder;
