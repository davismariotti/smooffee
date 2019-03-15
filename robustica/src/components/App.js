import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import firebaseApp from '../services/AuthService'
import 'firebase/auth'
import { AUTH_TOKEN, LOGGED_IN_USER_ID } from '../constants'
import Home from './Home'
import SignupContinued from './auth/SignupContinued'
import Login from './auth/Login'
import Recover from './auth/Recover'
import Signup from './auth/Signup'
import Navbar from './Navbar'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedin: false,
      updateClientCallback: props.updateClientCallback
    }
  }

  componentWillMount() {
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('AUTH STATE CHANGED', user)
        // If logged in...
        this.setState({ loggedin: true })
        user.getToken().then(result => {
          localStorage.setItem(AUTH_TOKEN, result);
          localStorage.setItem(LOGGED_IN_USER_ID, user.uid);
        });
      } else {
        // If not logged in...
        this.setState({ loggedin: false });
      }
    });
  }

  render() {
    const { updateClientCallback, loggedin } = this.state;
    return (
      <div className="home">
        <Navbar loggedin={loggedin} />
        <br />
        <Switch>
          <Route
            exact
            path="/"
            render={routeProps => (
              <Login
                {...routeProps}
                updateClientCallback={updateClientCallback}
              />
            )}
          />
          <Route
            path="/login"
            render={routeProps => (
              <Login
                {...routeProps}
                updateClientCallback={updateClientCallback}
              />
            )}
          />
          <Route
            path="/signup"
            render={routeProps => (
              <Signup
                {...routeProps}
                updateClientCallback={updateClientCallback}
              />
            )}
          />
          <Route path="/signupcontinued" component={SignupContinued} />
          <Route path="/recover" component={Recover} />
          <Route path="/home" component={Home} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  updateClientCallback: PropTypes.func.isRequired
};

export default App;
