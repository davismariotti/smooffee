import React, { Component } from 'react'
import {
  Button,
  Paper,
  Typography,
  FormControl,
  Input,
  InputLabel
} from '@material-ui/core'
import * as firebase from 'firebase'
import { Link } from 'react-router-dom'

class Recover extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: ''
    }

    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()

    const {email} = this.state

    firebase
      .auth()
      .sendPasswordResetEmail(email.trim())
      .then(
        () => {
          // Email sent.
          alert(`Please check your email ${email.trim()} for instructions. `)
        },
        () => {
          alert('Sorry an error has occured, Please try again')
        }
      )
  }

  render() {
    const {email} = this.state
    return (
      <main>
        <Paper className="centerSquare">
          <Typography component="h6" variant="h5" align="center">
            Forgot password
          </Typography>
          <form onSubmit={this.handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={this.handleEmailChange}
                autoFocus
              />
            </FormControl>

            <Button type="submit" fullWidth variant="contained">
              Submit
            </Button>
          </form>
          <Link to="/signup"> Sign Up</Link>
        </Paper>
      </main>
    )
  }
}

export default Recover
