import isEmail from 'validator/lib/isEmail'
import React, {Component} from 'react'
import {Button, FormControl, Input, InputLabel} from '@material-ui/core'
import * as PropTypes from 'prop-types'
import firebaseApp from '../../services/AuthService'

export class EmailPasswordSignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePassChange = this.handlePassChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    const {callback} = this.props
    e.preventDefault()
    const {email, password} = this.state
    if (isEmail(email)) {
      firebaseApp
        .auth()
        .createUserWithEmailAndPassword(email.trim(), password.trim())
        .then((result) => {
          callback(result)
        })
        .catch(error => {
          const errorMessage = error.message
          alert(`errorMessage: ${errorMessage}`)
        })
    } else {
      alert('Email Address in not valid')
    }
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value})
  }

  handlePassChange(e) {
    this.setState({password: e.target.value})
  }

  render() {
    const {email, password} = this.state
    return (
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
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            type="password"
            name="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={this.handlePassChange}
          />
        </FormControl>
        <Button type="submit" fullWidth variant="contained">
          Submit
        </Button>
      </form>
    )
  }
}

EmailPasswordSignUp.propTypes = {
  callback: PropTypes.func.isRequired
}
