import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import firebaseApp from '../services/AuthService'
import 'firebase/auth'
import { AUTH_TOKEN, USER_ID } from '../constants'
import Home from './Home'
import SignupContinued from './auth/signup/SignupContinued'
import Login from './auth/login/Login'
import Recover from './auth/login/Recover'
import Signup from './auth/signup/Signup'
import Navbar from './Navbar'
import OrganizationSettings from './organizationsettings'
import { ProtectedRoute } from '../utils/routeUtils'
import { ADMIN, EMPLOYEE, SUPERVISOR } from '../utils/role'

class App extends Component {

  componentWillMount() {
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        user.getToken().then(result => {
          localStorage.setItem(AUTH_TOKEN, result)
          localStorage.setItem(USER_ID, user.uid)
        })
      }
    })
  }

  render() {
    return (
      <div className="home">
        <Navbar/>
        <br/>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/signupcontinued" component={SignupContinued}/>
          <Route path="/recover" component={Recover}/>
          <ProtectedRoute path="/home" component={Home} allowedRoles={[ADMIN, EMPLOYEE, SUPERVISOR]}/>
          <ProtectedRoute path="/settings" component={OrganizationSettings} allowedRoles={[ADMIN, SUPERVISOR]}/>
        </Switch>
      </div>
    )
  }
}

App.propTypes = {}

export default App
