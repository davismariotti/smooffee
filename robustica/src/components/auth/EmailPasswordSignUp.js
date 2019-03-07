import isEmail from 'validator/lib/isEmail'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import firebaseApp from '../../services/AuthService'
import {AUTH_TOKEN} from '../../constants'
import history from '../../utils/robusticaHistory'

export class EmailPasswordSignUp extends Component {
  constructor(props) {
    console.log('props', props)
    super(props)
    this.state = {
      email: '',
      password: '',
      updateClientCallback: props.updateClientCallback
    }
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePassChange = this.handlePassChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    const { email, password } = this.state
    if (isEmail(email)) {
      firebaseApp
        .auth()
        .createUserWithEmailAndPassword(email.trim(), password.trim())
        .then(() => {
          const {updateClientCallback} = this.state
          firebaseApp.auth().currentUser.getToken().then((token) => {
            localStorage.setItem(AUTH_TOKEN, token)
            history.push('/signupcontinued')
            updateClientCallback()
          })
        })
        .catch((error) => {
          // Handle Errors here.
          const errorMessage = error.message
          alert(`errorMessage: ${  errorMessage}`)
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
        <input
          type="text"
          className="form-control"
          value={email}
          onChange={this.handleEmailChange}
          placeholder="Enter Email"
        />
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={this.handlePassChange}
          placeholder="Enter Password"
        />
        <br/>
        <button type="submit" className="btn btn-default">
          Submit
        </button>
      </form>
    )
  }
}

EmailPasswordSignUp.propTypes = {
  updateClientCallback: PropTypes.func.isRequired
};