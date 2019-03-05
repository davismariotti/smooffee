import React, {Component} from "react"
import {Link} from "react-router"
import gql from "graphql-tag"
import {EmailPasswordSignUp} from "./EmailPasswordSignUp"
import {GoogleSignIn} from "./GoogleSignIn"
import {FacebookSignIn} from "./FacebookSignIn"

const SignUpMutation = gql`
  mutation SignUp($userInput: UserInput!) {
    user {
      create(input: $userInput) {
        id
        firstName
        lastName
        email
        organizationId
      }
    }
  }
`

class Signup extends Component {
    constructor(props) {
        super(props)
    }

    registerUserGQL() {
    }


    // handleSubmit(e) {
    //     e.preventDefault()
    //     const email = this.state.email.trim()
    //     const password = this.state.password.trim()
    //     if (isEmail(email)) {
    //         firebaseApp
    //             .auth()
    //             .createUserWithEmailAndPassword(email, password)
    //             .catch(function (error) {
    //                 // Handle Errors here.
    //                 const errorMessage = error.message
    //                 alert("errorMessage: " + errorMessage)
    //             })
    //     } else {
    //         alert("Email Address in not valid")
    //     }
    // }
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
        )
    }
}

export default Signup
