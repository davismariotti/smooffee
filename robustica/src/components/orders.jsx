//Shows unfulfilled orders
import React, { Component } from "react";
import SingleOrder from "./singleOrder.jsx";

class Orders extends Component {
  state = {
    unfulfilledOrders: [
      { name: "Tom", numOrders: 3, date: "1/1/1", fullfilled: true },
      { name: "joe", numOrders: 3, date: "1/1/1", fullfilled: true },
      { name: "George", numOrders: 3, date: "1/1/1", fullfilled: true }
    ]
  };
  render() {
    return (
      <div>
        {this.state.unfulfilledOrders.map(singleOrder => (
          <SingleOrder key={singleOrder.id} />
        ))}
      </div>
    );
  }
}

export default Orders;
