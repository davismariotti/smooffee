import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Paper, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { EmailPasswordSignUp } from './EmailPasswordSignUp'
import { GoogleSignIn } from './GoogleSignIn'
import { FacebookSignIn } from './FacebookSignIn'
import history from '../../utils/history'
import '../../css/index.css'

class Signup extends Component {
  constructor(props) {
    super(props)
    this.pushToContinued = this.pushToContinued.bind(this)
  }

  pushToContinued() {
    history.push('/signupcontinued')
  }

  render() {
    const { updateClientCallback } = this.props
    return (
      <main>
        <Paper className="centerSquare">
          <Typography component="h6" variant="h5" align="center">
            Create New Account
          </Typography>
          <div align="center">
            <FacebookSignIn callback={this.pushToContinued} updateClientCallback={updateClientCallback}/>
            <GoogleSignIn callback={this.pushToContinued} updateClientCallback={updateClientCallback}/>
          </div>
          <EmailPasswordSignUp
            updateClientCallback={updateClientCallback}
            callback={this.pushToContinued}
          />
          <br />
          <p>
            Already Signed up? <Link to="/login">Log In</Link>
          </p>
        </Paper>
      </main>
    )
  }
}

Signup.propTypes = {
  updateClientCallback: PropTypes.func.isRequired
}

export default Signup
