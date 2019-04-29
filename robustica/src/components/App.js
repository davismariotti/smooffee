import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import firebaseApp from '../services/AuthService'
import 'firebase/auth'

import Home from './Home'
import SignupContinued from './Auth/signup/SignupContinued'
import Login from './Auth/login/Login'
import Recover from './Auth/login/Recover'
import Signup from './Auth/signup/Signup'
import Navbar from './Navbar/Navbar'
import MyAccount from './MyAccount'
import UserPage from './UserPage'
import { AuthenticatedRoute, ProtectedRoute } from '../utils/routeUtils'
import OrganizationSettings from './OrganizationSettings'
import { ADMIN, EMPLOYEE, SUPERVISOR } from '../utils/role'
import { StorageService } from '../services/StorageService'

class App extends Component {

  componentWillMount() {
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        user.getToken().then(result => {
          StorageService.setAuthToken(result)
          StorageService.setUserId(user.uid)
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
          <ProtectedRoute path="/userinfo/:id" component={UserPage} allowedRoles={[ADMIN]}/>
          <AuthenticatedRoute path="/account" component={MyAccount} />
        </Switch>
      </div>
    )
  }
}

App.propTypes = {}

export default App
