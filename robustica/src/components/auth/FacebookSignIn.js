import React, {Component} from "react"
import firebaseApp from "../../services/AuthService"
import * as firebase from "firebase"

export class FacebookSignIn extends Component {

    handleFacebook(e) {
        e.preventDefault()
        const provider = new firebase.auth.FacebookAuthProvider()
        firebaseApp
            .auth()
            .signInWithPopup(provider)
            .then(function (result) {
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                //var token = result.credential.accessToken;
                // The signed-in user info.
                //var user = result.user;
                console.log("Facebook login success")
            })
            .catch(function (error) {
                const errorMessage = error.message
                alert("Facebook sign in error: " + errorMessage)
            })
    }

    render() {
        return (
            <a className="btn btn-block btn-social btn-facebook" onClick={this.handleFacebook}>
                <span className="fa fa-facebook"/>
                Sign in with Facebook
            </a>
        )
    }
}