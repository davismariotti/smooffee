import isEmail from 'validator/lib/isEmail'

import { AUTH_TOKEN, ORGANIZATION_ID, USER_ID } from '../../constants'
import firebaseApp from '../../services/AuthService'
import { readCurrentUserQuery } from '../../graphql/userQueries'
import history from '../../utils/history'
import { client } from '../../services/apollo'
import AuthActions from './actions'

export default class AuthMiddleware {
  static createUserWithEmailAndPassword(email, password) {
    return dispatch => {
      if (isEmail(email)) {
        firebaseApp
          .auth()
          .createUserWithEmailAndPassword(email.trim(), password.trim())
          .then((result) => {
            localStorage.setItem(USER_ID, result.uid)
            firebaseApp
              .auth()
              .currentUser.getToken()
              .then(token => {
                localStorage.setItem(AUTH_TOKEN, token)
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
          localStorage.setItem(USER_ID, result.uid)
          firebaseApp.auth().currentUser.getToken().then(token => {
            localStorage.setItem(AUTH_TOKEN, token)
            client.query({query: readCurrentUserQuery}).then(({error, data}) => {
              if (error) {
                dispatch(AuthActions.signInError(error))
              } else {
                localStorage.setItem(ORGANIZATION_ID, data.user.currentUser.organizationId)
                dispatch(AuthActions.signInSuccess())
                history.push('/home')
              }
            })
          })
        })
          .catch(error => {
            dispatch(AuthActions.signInError(error.message))
          })
      } else {
        dispatch(AuthActions.signInError('Email Address is not valid'))
      }
    }
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