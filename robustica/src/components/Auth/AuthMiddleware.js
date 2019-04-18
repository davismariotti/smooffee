import isEmail from 'validator/lib/isEmail'
import * as firebase from 'firebase'

import firebaseApp from '../../services/AuthService'
import { readCurrentUserQuery } from '../../graphql/userQueries'
import history from '../../utils/history'
import { client } from '../../services/apollo'
import AuthActions from './actions'
import { StorageService } from '../../services/StorageService'


export default class AuthMiddleware {
  static createUserWithEmailAndPassword(email, password) {
    return dispatch => {
      if (isEmail(email)) {
        firebaseApp
          .auth()
          .createUserWithEmailAndPassword(email.trim(), password.trim())
          .then((result) => {
            StorageService.setUserId(result.uid)
            firebaseApp
              .auth()
              .currentUser.getToken()
              .then(token => {
                StorageService.setAuthToken(token)
                dispatch(AuthActions.signUpSuccess())
                history.push('/signupcontinued')
              })
          })
          .catch(error => {
            dispatch(AuthActions.signUpError(error.message))
          })
      } else {
        dispatch(AuthActions.signUpError('Email Address in not valid'))
      }
    }
  }

  static signInWithEmailAndPassword(email, password) {
    return dispatch => {
      if (isEmail(email)) {
        firebaseApp.auth().signInWithEmailAndPassword(email, password).then(result => {
          AuthMiddleware.continueLogin(result, dispatch)
        })
          .catch(error => {
            dispatch(AuthActions.signInError(error.message))
          })
      } else {
        dispatch(AuthActions.signInError('Email Address is not valid'))
      }
    }
  }

  static signInWithGoogle() {
    return dispatch => {
      firebaseApp
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(result => {
          AuthMiddleware.continueLogin(result, dispatch)
        })
        .catch(error => {
          dispatch(AuthActions.signInError(error.message))
        })
    }
  }

  static continueLogin(result, dispatch) {
    StorageService.setUserId(result.uid)
    firebaseApp.auth().currentUser.getToken().then(token => {
      StorageService.setAuthToken(token)
      client.query({query: readCurrentUserQuery}).then(({error, data}) => {
        if (error) {
          dispatch(AuthActions.signInError(error))
        } else {
          StorageService.setOrganizationId(data.user.currentUser.organizationId)
          StorageService.setUserRole(data.user.currentUser.role)
          dispatch(AuthActions.signInSuccess())
          history.push('/home')
        }
      })
    })
  }

  static recoverWithEmail(email) {
    return dispatch => {
      firebaseApp.auth().sendPasswordResetEmail(email.trim())
        .then(
          () => {
            dispatch(AuthActions.recoverSuccess(`Please check your email ${email.trim()} for instructions.`))
          },
          () => {
            dispatch(AuthActions.recoverError('Sorry an error has occured, Please try again.'))
          }
        )
    }
  }


}