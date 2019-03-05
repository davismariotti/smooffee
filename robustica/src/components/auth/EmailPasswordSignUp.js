import isEmail from "validator/lib/isEmail"
import firebaseApp from "../../services/AuthService"
import React, {Component} from "react"

export class EmailPasswordSignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {email: "", password: ""}
        //
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
                .catch(function (error) {
                    // Handle Errors here.
                    const errorMessage = error.message
                    alert("errorMessage: " + errorMessage)
                })
        } else {
            alert("Email Address in not valid")
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