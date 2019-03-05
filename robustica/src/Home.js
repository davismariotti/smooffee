import React, { Component } from "react";
import OrderList from "./components/orderList";
import Options from "./options";
class Home extends Component {
  render() {
    return (
      <div className="Home">
        <Options />
        <OrderList />
      </div>
    );
  }
}

export default Home;
