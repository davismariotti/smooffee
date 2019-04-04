import React, { Component } from 'react'
import { Card, CardContent, GridListTile, Typography } from '@material-ui/core'
import '../../../css/index.css'
import * as PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import CardActions from '@material-ui/core/CardActions'

const styles = {
  card: {
    width: 200,
    height: 200,
    margin: '10px'
  },
  media: {
    height: 140,
  },
  gridTile: {
    padding: '3px',
  }
}

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
    const {item, user, location, notes, classes} = this.props

    return (
      <GridListTile className={classes.gridTile}>
        <Card className={classes.card}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h3">
              {item}
            </Typography>
            <Typography component="p">
              {user}
            </Typography>
            <Typography component="p">
              {location}
            </Typography>
            <Typography component="p">
              {notes}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Edit
            </Button>
            <Button size="small" color="primary">
              In Progress
            </Button>
          </CardActions>
        </Card>
      </GridListTile>
    )
  }
}

Order.propTypes = {
  item: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  notes: PropTypes.string,
  location: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
}

Order.defaultProps = {
  notes: ''
}

export default withStyles(styles)(Order)
