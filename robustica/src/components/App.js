import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import firebaseApp from '../services/AuthService'
import 'firebase/auth'
import { AUTH_TOKEN, USER_ID } from '../constants'
import Home from './Home'
import SignupContinued from './Auth/signup/SignupContinued'
import Login from './Auth/login/Login'
import Recover from './Auth/login/Recover'
import Signup from './Auth/signup/Signup'
import Navbar from './Navbar'
import OrganizationSettings from './OrganizationSettings'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedin: localStorage.getItem(USER_ID) !== ''
    }
  }

  componentWillMount() {
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user) { // If logged in...
        this.setState({
          loggedin: true
        })
        user.getToken().then(result => {
          localStorage.setItem(AUTH_TOKEN, result)
          localStorage.setItem(USER_ID, user.uid)
        })
      } else {
        // If not logged in...
        this.setState({
          loggedin: false
        })
      }
    })
  }

  render() {
    const {updateClientCallback, loggedin} = this.state
    return (
      <div className="home">
        <Navbar loggedin={loggedin}/>
        <br/>
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
              <Login {...routeProps}/>
            )}
          />
          <Route
            path="/signup"
            render={routeProps => (
              <Signup {...routeProps}/>
            )}
          />
          <Route path="/signupcontinued" component={SignupContinued}/>
          <Route path="/recover" component={Recover}/>
          <Route path="/home" component={Home}/>
          <Route path="/settings" component={OrganizationSettings}/>
        </Switch>
      </div>
    )
  }
}

App.propTypes = {}

export default App
