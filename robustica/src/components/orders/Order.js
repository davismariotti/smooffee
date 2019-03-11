import React, { Component } from 'react'
import { ListItem, ListItemText, Typography, Button } from '@material-ui/core'
import '../../css/index.css'

class Order extends Component {
  constructor(props) {
    super(props)
    // TODO create fullfil and edit buttons(need to bind them to DB)
    this.fulfill = this.fulfill.bind(this)
    this.edit = this.edit.bind(this)
  }

  fulfill() {
    // TODO tie user who fulfills order to reciept
  }

  edit() {
    // TODO add edit order options
  }

  render() {
    const { item, user, notes, location } = this.props

    return (
      <ListItem className="order">
        <ListItemText
          primary={item}
          secondary={
            <React.Fragment>
              <Typography color="textPrimary">{user}</Typography>
              <Typography color="textSecondary">{notes}</Typography>
              {location}
              <Button onClick={this.edit}>Edit</Button>
              <Button onClick={this.fulfill}>Fulfill</Button>
            </React.Fragment>
          }
        />
      </ListItem>
    )
  }
}

export default Order
