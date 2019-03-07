import isEmail from 'validator/lib/isEmail'
import React, {Component} from 'react'
import {browserHistory} from 'react-router'
import firebaseApp from '../../services/AuthService'
import {AUTH_TOKEN} from '../../constants'

export class EmailPasswordSignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {email: '', password: ''}
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePassChange = this.handlePassChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()
        const email = this.state.email.trim()
        const password = this.state.password.trim()
        if (isEmail(email)) {
            firebaseApp
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                  firebaseApp.auth().currentUser.getToken().then((token) => {
                    localStorage.setItem(AUTH_TOKEN, token)
                    browserHistory.push('/signupcontinued');
                    window.location.reload()
                  })
                })
                .catch((error) => {
                    // Handle Errors here.
                    const errorMessage = error.message
                    alert(`errorMessage: ${  errorMessage}`)
                })
        } else {
            alert('Email Address in not valid')
        }
    }

    handleEmailChange(e) {
        this.setState({email: e.target.value})
    }

    handlePassChange(e) {
        this.setState({password: e.target.value})
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    className="form-control"
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                    placeholder="Enter Email"
                />
                <input
                    type="password"
                    className="form-control"
                    value={this.state.password}
                    onChange={this.handlePassChange}
                    placeholder="Enter Password"
                />
                <br/>
                <button type="submit" className="btn btn-default">
                    Submit
                </button>
            </form>
        )
    }
}