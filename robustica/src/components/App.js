import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import firebaseApp from '../services/AuthService'
import 'firebase/auth'
import {AUTH_TOKEN} from '../constants'
import Navbar from './Navbar'
import '../css/font-awesome.css'
import '../css/bootstrap-social.css'
import Home from './Home'
import SignupContinued from './auth/SignupContinued'
import Login from './auth/Login'
import Recover from './auth/Recover'
import Signup from './auth/Signup'
import PropTypes from 'prop-types'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedin: false,
      updateClientCallback: props.updateClientCallback
    }
  }

  componentWillMount() {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('AUTH STATE CHANGED', user)
        // If logged in...
        this.setState({loggedin: true})
        user.getToken()
          .then((result) => {
            localStorage.setItem(AUTH_TOKEN, result)
          })
      } else {
        // If not logged in...
        this.setState({loggedin: false})
      }
    })
  }

  render() {
    const {loggedin, updateClientCallback} = this.state
    return (
      <div>
        <div className="App">
          <div className="App-header">
            <h4>Smooffee</h4>
          </div>
          <Navbar loggedin={loggedin}/>
        </div>
        <Switch>
          <Route exact path="/" render={(routeProps) => <Login {...routeProps} updateClientCallback={updateClientCallback}/>}/>
          <Route path="/login" render={(routeProps) => <Login {...routeProps} updateClientCallback={updateClientCallback}/>}/>
          <Route path="/signup"
                 render={(routeProps) => <Signup {...routeProps} updateClientCallback={updateClientCallback}/>}/>
          <Route path="/signupcontinued" component={SignupContinued}/>
          <Route path="/recover" component={Recover}/>
          <Route path="/home" component={Home}/>
        </Switch>
      </div>
    )
  }
}

App.propTypes = {
  updateClientCallback: PropTypes.func.isRequired
};

export default App
