import React, { Component } from "react";
import OrderList from "./components/orderList";

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <h1> This is where orders appear</h1>
        <OrderList />
      </div>
    );
  }
}

export default Home;
