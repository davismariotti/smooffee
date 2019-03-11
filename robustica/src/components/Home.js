import React, { Component } from 'react';
import { Typography, List } from '@material-ui/core';
import Order from './orders/Order';
import '../css/index.css';

class Home extends Component {
  render() {
    return (
      <div className="orderList">
        <Typography variant="h3" color="inherit">
          Current Orders
        </Typography>
        <List>
          <Order
            item="Latte"
            user="Tom"
            location="EJ 210"
            notes="Lots of whip cream please!!!"
          />
          <Order item="Stawberry Smoothie" user="Tersa" location="EJ 210" />
          <Order item="Frappacino" user="Davis" location="EJ 210" />
          <Order item="Latte" user="Tom" location="EJ 210" />
          <Order item="Stawberry Smoothie" user="Tersa" location="EJ 210" />
          <Order item="Frappacino" user="Davis" location="EJ 210" />
          <Order item="Latte" user="Tom" location="EJ 210" />
          <Order item="Stawberry Smoothie" user="Tersa" location="EJ 210" />
          <Order item="Frappacino" user="Davis" location="EJ 210" />
          <Order item="Latte" user="Tom" location="EJ 210" />
          <Order item="Stawberry Smoothie" user="Tersa" location="EJ 210" />
          <Order item="Frappacino" user="Davis" location="EJ 210" />
          <Order item="Latte" user="Tom" location="EJ 210" />
          <Order item="Stawberry Smoothie" user="Tersa" location="EJ 210" />
          <Order item="Frappacino" user="Davis" location="EJ 210" />
          <Order item="Latte" user="Tom" location="EJ 210" />
          <Order item="Stawberry Smoothie" user="Tersa" location="EJ 210" />
          <Order item="Frappacino" user="Davis" location="EJ 210" />
          <Order item="Latte" user="Tom" location="EJ 210" />
          <Order item="Stawberry Smoothie" user="Tersa" location="EJ 210" />
          <Order item="Frappacino" user="Davis" location="EJ 210" />
        </List>
      </div>
    );
  }
}

export default Home;
