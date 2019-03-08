import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import isEmail from 'validator/lib/isEmail'
import React, {Component} from 'react'
import Button from '@material-ui/core/Button'
import firebaseApp from '../../services/AuthService'
import {AUTH_TOKEN, LOGGED_USER_ID} from '../../constants'
import history from '../../utils/robusticaHistory'
import {GoogleSignIn} from './GoogleSignIn'
import {FacebookSignIn} from './FacebookSignIn'


class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      updateClientCallback: props.updateClientCallback
    }
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePassChange = this.handlePassChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.pushToHome = this.pushToHome.bind(this);
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value
    })
  }

  handlePassChange(e) {
    this.setState({
      password: e.target.value
    })
  }

  pushToHome() {
    history.push('/home')
  }

  handleSubmit(e) {
    const {email, password} = this.state
    e.preventDefault()
    if (isEmail(email)) {
      firebaseApp
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
          const {updateClientCallback} = this.state
          firebaseApp.auth().currentUser.getToken().then((token) => {
            localStorage.setItem(AUTH_TOKEN, token)
            localStorage.setItem(LOGGED_USER_ID, result.user.uid)
            history.push('/home')
            updateClientCallback()
          })
        })
        .catch(error => {
          // Handle Errors here.
          const errorMessage = error.message
          alert(`errorMessage: ${errorMessage}`)
        })
    } else {
      alert('Email Address is not valid')
    }
  }

  render() {
    const {email, password, updateClientCallback} = this.state
    // const pushToHome = this.pushToHome
    return (
      <div className="Login text-center">
        <br/>
        <br/>
        <div className="col-md-4"/>
        <div className="form-group col-md-4 table-bordered">
          <br/>
          <br/>
          <FacebookSignIn callback={this.pushToHome} updateClientCallback={updateClientCallback}/>
          <GoogleSignIn callback={this.pushToHome} updateClientCallback={updateClientCallback}/>
          <br/>
          <p className="text-center">------------- Or -------------</p>
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
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
          <br/>
          <br/>
          <p>
            Forgot Password? <Link to="/recover"> Click Here</Link>
          </p>
          <p>
            Not SIgned up yet? <Link to="/signup"> Sign Up</Link>
          </p>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  updateClientCallback: PropTypes.func.isRequired
}

export default Login
