import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { EmailPasswordSignUp } from './EmailPasswordSignUp';
import { GoogleSignIn } from './GoogleSignIn';
import { FacebookSignIn } from './FacebookSignIn';
import history from '../../utils/robusticaHistory';
import '../../css/index.css';

class Signup extends Component {
  constructor(props) {
    console.log('props1', props);
    super(props);
    this.state = {
      updateClientCallback: props.updateClientCallback
    };
  }

  static pushToContinued() {
    history.push('/signupcontinued');
  }

  render() {
    const { updateClientCallback } = this.state;
    return (
      <main>
        <Paper className="centerSquare">
          <Typography component="h6" variant="h5" align="center">
            Create New Account
          </Typography>
          <div align="center">
            <FacebookSignIn callback={Signup.pushToContinued} />
            <GoogleSignIn callback={Signup.pushToContinued} />
          </div>
          <EmailPasswordSignUp
            updateClientCallback={updateClientCallback}
            callback={Signup.pushToContinued}
          />
          <br />
          <p>
            Already Signed up? <Link to="/login">Log In</Link>
          </p>
        </Paper>
      </main>
    );
  }
}

Signup.propTypes = {
  updateClientCallback: PropTypes.func.isRequired
};

export default Signup;
