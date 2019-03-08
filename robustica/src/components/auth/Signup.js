import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import { EmailPasswordSignUp } from './EmailPasswordSignUp'
import { GoogleSignIn } from './GoogleSignIn'
import { FacebookSignIn } from './FacebookSignIn'
import history from '../../utils/robusticaHistory'

class Signup extends Component {
  constructor(props) {
    console.log('props1', props)
    super(props)
    this.state = {
      updateClientCallback: props.updateClientCallback
    }
  }

  static pushToContinued() {
    history.push('/signupcontinued')
  }

  render() {
    const { updateClientCallback } = this.state
    return (
      <div className="Signup text-center">
        <h1>Sign up</h1>
        <div className="col-md-4"/>

        <div className="form-group col-md-4">
          <FacebookSignIn callback={Signup.pushToContinued}/>
          <GoogleSignIn callback={Signup.pushToContinued}/>
          <br/>
          <p className="text-center">------------- Or -------------</p>
          <EmailPasswordSignUp updateClientCallback={updateClientCallback} callback={Signup.pushToContinued}/>
          <br/>
          <p>
            Already Signed up? <Link to="/login">Log In</Link>
          </p>
        </div>
      </div>
    )
  }
}

Signup.propTypes = {
  updateClientCallback: PropTypes.func.isRequired
}

export default Signup
