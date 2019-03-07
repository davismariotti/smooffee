import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { EmailPasswordSignUp } from './EmailPasswordSignUp';
import { GoogleSignIn } from './GoogleSignIn';
import { FacebookSignIn } from './FacebookSignIn';
import {Link} from 'react-router-dom'

class Signup extends Component {
  constructor(props) {
    console.log('props1', props)
    super(props)
    this.state = {
      updateClientCallback: props.updateClientCallback
    }
  }

  render() {
    const { updateClientCallback } = this.state
    return (
      <div className="Signup">
        <h1>Sign up</h1>
        <div className="col-md-4"/>

        <div className="form-group col-md-4">
          <FacebookSignIn/>
          <GoogleSignIn/>
          <br/>
          <p className="text-center">------------- Or -------------</p>
          <EmailPasswordSignUp {...this.props} updateClientCallback={updateClientCallback}/>
          <br/>
          <p>
            Already Signed up? <Link to="/login">Log In</Link>
          </p>
        </div>
      </div>
    );
  }
}


Signup.propTypes = {
  updateClientCallback: PropTypes.func.isRequired
};

export default Signup;
