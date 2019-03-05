import firebaseApp from "../../services/AuthService"
import * as firebase from "firebase"
import React, {Component} from 'react'

export class GoogleSignIn extends Component {
    handleGoogle(e) {
        e.preventDefault()
        const provider = new firebase.auth.GoogleAuthProvider()
        firebaseApp
            .auth()
            .signInWithPopup(provider)
            .then(function (result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                //var token = result.credential.accessToken;
                // The signed-in user info.
                //var user = result.user;
                console.log("Google login success")
                console.log("Test One")
                // firebaseApp
                //     .auth()
                //     .currentUser.getIdTokenResult(true)
                //     .then(function (result) {
                //         console.log("Test Two", result)
                //     })
            })
            .catch(function (error) {
                const errorMessage = error.message
                alert("Google sign in error: " + errorMessage)
            })
    }

    render() {
        return (
            <a className="btn btn-block btn-social btn-google" onClick={this.handleGoogle}>
                <span className="fa fa-google"/>
                Sign in with Google
            </a>
        )
    }
}