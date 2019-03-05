import React, { Component } from "react";
import Order from "./order";

class OrderList extends Component {
  //TODO make list update dynamically from database
  render() {
    return (
      <div>
        <h3>Pending Orders</h3>
        <Order item="Latte" user="Tom" location="EJ 210" />
        <Order item="Stawberry Smoothie" user="Tersa" location="EJ 210" />
        <Order item="Frappacino" user="Davis" location="EJ 210" />
      </div>
    );
  }
}

export default OrderList;
