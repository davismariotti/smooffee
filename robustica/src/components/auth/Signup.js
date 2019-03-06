import React, { Component } from 'react';
import { Link } from 'react-router';
import { EmailPasswordSignUp } from './EmailPasswordSignUp';
import { GoogleSignIn } from './GoogleSignIn';
import { FacebookSignIn } from './FacebookSignIn';

class Signup extends Component {
  render() {
    return (
      <div className="Signup">
        <h1>Sign up</h1>
        <div className="col-md-4"/>

        <div className="form-group col-md-4">
          <FacebookSignIn/>
          <GoogleSignIn/>
          <br/>
          <p className="text-center">------------- Or -------------</p>
          <EmailPasswordSignUp/>
          <br/>
          <p>
            Already Signed up? <Link to="/login">Log In</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default Signup;
